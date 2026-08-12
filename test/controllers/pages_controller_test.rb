require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get root_path
    assert_inertia_component "Home"
    assert_select "html[lang='en']"
  end
end
