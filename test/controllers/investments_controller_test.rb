require "test_helper"

class InvestmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get investments_path
    assert_inertia_component "Investments/Index"
  end

  test "should get new when signed in" do
    sign_in_as users(:one)
    get new_investment_path
    assert_inertia_component "Investments/New"
  end
end
