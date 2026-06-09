require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get articles_path
    assert_inertia_component "Articles/Index"
  end

  test "should get show" do
    get article_path(articles(:one))
    assert_inertia_component "Articles/Show"
  end

  test "new requires authentication" do
    get new_article_path
    assert_redirected_to root_path
  end

  test "should get new when signed in" do
    sign_in_as users(:one)
    get new_article_path
    assert_inertia_component "Articles/New"
  end
end
