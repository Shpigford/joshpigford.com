require "test_helper"

class InvestmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get investments_index_url
    assert_response :success
  end

  test "should get new" do
    get investments_new_url
    assert_response :success
  end
end
