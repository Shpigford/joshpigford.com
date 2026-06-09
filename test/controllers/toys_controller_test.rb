require "test_helper"

class ToysControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get toys_path
    assert_response :success
    assert_inertia_component "Toys/Index"
  end

  test "should get show" do
    get toy_path(toys(:one))
    assert_response :success
    assert_inertia_component "Toys/Show"
  end

  test "new requires authentication" do
    get new_toy_path
    assert_redirected_to root_path
  end

  test "should get new when signed in" do
    sign_in_as users(:one)
    get new_toy_path
    assert_response :success
    assert_inertia_component "Toys/New"
  end
end
