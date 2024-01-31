require "test_helper"

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get projects_index_url
    assert_response :success
  end

  test "should get new" do
    get projects_new_url
    assert_response :success
  end

  test "should get show" do
    get projects_show_url
    assert_response :success
  end
end
