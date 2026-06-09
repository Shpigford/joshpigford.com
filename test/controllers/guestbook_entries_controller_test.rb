require "test_helper"
require "minitest/mock"

class GuestbookEntriesControllerTest < ActionDispatch::IntegrationTest
  Result = GuestbookModerator::Result

  setup do
    @admin = User.create!(email: "admin@example.com", password: "password123")
  end

  def login_admin
    post session_path, params: { email: @admin.email, password: "password123" }
  end

  test "index renders" do
    get guestbook_entries_url
    assert_response :success
    assert_inertia_component "Guestbook/Index"
  end

  test "index exposes approved entries with homepage and reactions" do
    get guestbook_entries_url
    assert_inertia_props do |props|
      entry = props["entries"].find { |e| e["name"] == "Ada" }
      entry["homepage"] == "https://example.com" && entry.key?("reactions")
    end
  end

  test "signed-in admin sees the pending queue" do
    login_admin
    get guestbook_entries_url
    assert_inertia_props do |props|
      props["pending"].any? { |e| e["name"] == "Grace" }
    end
  end

  test "anonymous visitor gets no pending queue" do
    get guestbook_entries_url
    assert_no_inertia_prop :pending
  end

  test "create with approved verdict saves an approved entry" do
    GuestbookModerator.stub :call, Result.new(status: :approved, reason: nil) do
      assert_difference "GuestbookEntry.count", 1 do
        post guestbook_entries_url, params: { guestbook_entry: { name: "Ada", message: "Hi Josh!" } }
      end
    end
    assert_redirected_to guestbook_entries_path
    assert_equal "approved", GuestbookEntry.last.status
  end

  test "create with rejected verdict still saves but as rejected" do
    GuestbookModerator.stub :call, Result.new(status: :rejected, reason: "spam") do
      assert_difference "GuestbookEntry.count", 1 do
        post guestbook_entries_url, params: { guestbook_entry: { name: "Bot", message: "buy now" } }
      end
    end
    assert_equal "rejected", GuestbookEntry.last.status
  end

  test "honeypot submission creates nothing" do
    assert_no_difference "GuestbookEntry.count" do
      post guestbook_entries_url, params: { guestbook_entry: { name: "Bot", message: "spam", nickname: "gotcha" } }
    end
    assert_redirected_to guestbook_entries_path
  end

  test "invalid submission redirects back with errors and saves nothing" do
    assert_no_difference "GuestbookEntry.count" do
      post guestbook_entries_url, params: { guestbook_entry: { name: "", message: "" } }
    end
    assert_redirected_to guestbook_entries_path

    follow_redirect!
    assert_inertia_props do |props|
      props["errors"]["name"].include?("Name can't be blank")
    end
  end

  test "anonymous cannot destroy" do
    entry = guestbook_entries(:approved_one)
    assert_no_difference "GuestbookEntry.count" do
      delete guestbook_entry_url(entry)
    end
    assert_redirected_to root_path
  end

  test "admin can destroy" do
    login_admin
    entry = guestbook_entries(:approved_one)
    assert_difference "GuestbookEntry.count", -1 do
      delete guestbook_entry_url(entry)
    end
  end

  test "admin can approve a pending entry" do
    login_admin
    entry = guestbook_entries(:pending_one)
    patch approve_guestbook_entry_url(entry)
    assert_equal "approved", entry.reload.status
  end

  test "rate limits a second post from the same IP within the window" do
    GuestbookModerator.stub :call, Result.new(status: :approved, reason: nil) do
      post guestbook_entries_url, params: { guestbook_entry: { name: "A", message: "hi" } },
           headers: { "CF-Connecting-IP" => "9.9.9.9" }
      assert_redirected_to guestbook_entries_path

      assert_no_difference "GuestbookEntry.count" do
        post guestbook_entries_url, params: { guestbook_entry: { name: "B", message: "again" } },
             headers: { "CF-Connecting-IP" => "9.9.9.9" }
      end
      assert_redirected_to guestbook_entries_path
      assert_equal "Hang on — you can only sign once a minute. Try again shortly.", flash[:alert]
    end
  end

  test "different IPs are not throttled against each other" do
    GuestbookModerator.stub :call, Result.new(status: :approved, reason: nil) do
      post guestbook_entries_url, params: { guestbook_entry: { name: "A", message: "hi" } },
           headers: { "CF-Connecting-IP" => "1.1.1.1" }
      assert_difference "GuestbookEntry.count", 1 do
        post guestbook_entries_url, params: { guestbook_entry: { name: "B", message: "hi" } },
             headers: { "CF-Connecting-IP" => "2.2.2.2" }
      end
    end
  end

  test "allows posting again once the window has passed" do
    ip = "5.5.5.5"
    GuestbookEntry.create!(name: "old", message: "old", status: "approved",
                           ip_hash: GuestbookEntry.digest_ip(ip),
                           created_at: (GuestbookEntry::RATE_LIMIT + 1.second).ago)
    GuestbookModerator.stub :call, Result.new(status: :approved, reason: nil) do
      assert_difference "GuestbookEntry.count", 1 do
        post guestbook_entries_url, params: { guestbook_entry: { name: "new", message: "hi" } },
             headers: { "CF-Connecting-IP" => ip }
      end
    end
  end

  test "create captures the Cloudflare country header" do
    GuestbookModerator.stub :call, Result.new(status: :approved, reason: nil) do
      post guestbook_entries_url,
           params: { guestbook_entry: { name: "Ada", message: "hi" } },
           headers: { "CF-IPCountry" => "JP" }
    end
    assert_equal "JP", GuestbookEntry.last.country_code
  end

  test "react increments a reaction on an approved entry" do
    entry = guestbook_entries(:approved_one)
    emoji = entry.reaction_emojis.first
    assert_difference -> { entry.reload.reactions[emoji].to_i }, 1 do
      post react_guestbook_entry_url(entry), params: { emoji: emoji }
    end
    assert_response :ok
  end

  test "reacting to one emoji never touches another emoji's count" do
    entry = guestbook_entries(:approved_one)
    first, second = entry.reaction_emojis.first(2)
    post react_guestbook_entry_url(entry), params: { emoji: first }
    post react_guestbook_entry_url(entry), params: { emoji: second }
    post react_guestbook_entry_url(entry), params: { emoji: first }
    assert_equal({ first => 2, second => 1 }, entry.reload.reactions)
  end

  test "react does nothing on a non-approved entry" do
    entry = guestbook_entries(:pending_one)
    post react_guestbook_entry_url(entry), params: { emoji: entry.reaction_emojis.first }
    assert_empty entry.reload.reactions
    assert_response :not_found
  end
end
