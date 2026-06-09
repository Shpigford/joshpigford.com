require "test_helper"

class GuestbookModeratorTest < ActiveSupport::TestCase
  def entry
    GuestbookEntry.new(name: "Ada", message: "Hello there")
  end

  def body_with(content)
    { "choices" => [{ "message" => { "content" => content.to_json } }] }.to_json
  end

  test "interpret maps allowed=true to approved" do
    result = GuestbookModerator.new(entry).interpret(body_with("allowed" => true, "reason" => "fine"))
    assert_equal :approved, result.status
    assert_nil result.reason
  end

  test "interpret maps allowed=false to rejected and keeps reason" do
    result = GuestbookModerator.new(entry).interpret(body_with("allowed" => false, "reason" => "spam"))
    assert_equal :rejected, result.status
    assert_equal "spam", result.reason
  end

  test "call returns pending when api key is blank" do
    original = ENV["OPENROUTER_API_KEY"]
    ENV["OPENROUTER_API_KEY"] = nil
    result = GuestbookModerator.call(entry)
    assert_equal :pending, result.status
  ensure
    ENV["OPENROUTER_API_KEY"] = original
  end
end
