require "test_helper"

class GuestbookEntryTest < ActiveSupport::TestCase
  test "valid with name and message" do
    assert GuestbookEntry.new(name: "Linus", message: "Hello").valid?
  end

  test "requires name" do
    entry = GuestbookEntry.new(message: "Hello")
    assert_not entry.valid?
    assert_includes entry.errors[:name], "can't be blank"
  end

  test "requires message" do
    entry = GuestbookEntry.new(name: "Linus")
    assert_not entry.valid?
    assert_includes entry.errors[:message], "can't be blank"
  end

  test "defaults to pending" do
    assert_equal "pending", GuestbookEntry.new.status
  end

  test "visible scope returns only approved, newest first" do
    visible = GuestbookEntry.visible
    assert_includes visible, guestbook_entries(:approved_one)
    assert_not_includes visible, guestbook_entries(:pending_one)
  end

  test "nickname is virtual and not persisted" do
    entry = GuestbookEntry.create!(name: "Bot", message: "spam", nickname: "filled")
    assert_equal "filled", entry.nickname
    assert_not_includes entry.attributes.keys, "nickname"
  end

  test "react! increments an emoji from the entry's own set" do
    entry = guestbook_entries(:approved_one)
    emoji = entry.reaction_emojis.first
    entry.react!(emoji)
    entry.react!(emoji)
    assert_equal 2, entry.reload.reactions[emoji]
  end

  test "react! ignores an emoji outside the entry's set" do
    entry = guestbook_entries(:approved_one)
    outsider = (GuestbookEntry::EMOJI_POOL - entry.reaction_emojis).first
    entry.react!(outsider)
    assert_empty entry.reload.reactions
  end

  test "posted_recently? detects a recent post and ignores old ones" do
    ip_hash = GuestbookEntry.digest_ip("7.7.7.7")
    assert_not GuestbookEntry.posted_recently?(ip_hash)

    GuestbookEntry.create!(name: "x", message: "y", status: "approved",
                           ip_hash: ip_hash, created_at: 10.seconds.ago)
    assert GuestbookEntry.posted_recently?(ip_hash)
  end

  test "posted_recently? ignores posts older than the window" do
    ip_hash = GuestbookEntry.digest_ip("8.8.8.8")
    GuestbookEntry.create!(name: "x", message: "y", status: "approved",
                           ip_hash: ip_hash, created_at: 5.minutes.ago)
    assert_not GuestbookEntry.posted_recently?(ip_hash)
  end

  test "reaction_emojis is stable across reloads and unique per entry" do
    entry = guestbook_entries(:approved_one)
    assert_equal entry.reaction_emojis, entry.reload.reaction_emojis
    assert_equal GuestbookEntry::REACTION_COUNT, entry.reaction_emojis.uniq.size
    assert_not_equal entry.reaction_emojis, guestbook_entries(:pending_one).reaction_emojis
  end
end
