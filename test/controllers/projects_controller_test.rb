require "test_helper"

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get projects_path
    assert_inertia_component "Projects/Index"
  end

  test "should get show" do
    get project_path(projects(:one))
    assert_inertia_component "Projects/Show"
  end

  test "new requires authentication" do
    get new_project_path
    assert_redirected_to root_path
  end

  test "should get new when signed in" do
    sign_in_as users(:one)
    get new_project_path
    assert_inertia_component "Projects/New"
  end
end
