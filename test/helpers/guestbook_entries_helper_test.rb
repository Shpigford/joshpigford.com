require "test_helper"

class GuestbookEntriesHelperTest < ActionView::TestCase
  test "converts a country code to its flag emoji" do
    assert_equal "🇯🇵", flag_emoji("JP")
    assert_equal "🇺🇸", flag_emoji("us")
  end

  test "returns nil for blank or malformed codes" do
    assert_nil flag_emoji(nil)
    assert_nil flag_emoji("")
    assert_nil flag_emoji("USA")
  end
end
