require "test_helper"

class PodcastsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get podcasts_path
    assert_inertia_component "Podcasts/Index"
  end

  test "should get new when signed in" do
    sign_in_as users(:one)
    get new_podcast_path
    assert_inertia_component "Podcasts/New"
  end
end
