require "test_helper"

class PodcastsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get podcasts_index_url
    assert_response :success
  end

  test "should get new" do
    get podcasts_new_url
    assert_response :success
  end
end
