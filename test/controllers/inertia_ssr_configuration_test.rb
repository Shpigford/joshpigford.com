require "test_helper"

class InertiaSsrConfigurationTest < ActiveSupport::TestCase
  test "SSR build is enabled and bundle path matches the build output" do
    assert ViteRuby.config.ssr_build_enabled
    assert_equal Rails.public_path.join("vite-ssr/ssr.js").to_s,
                 InertiaRails.configuration.ssr_bundle
  end

  test "SSR rendering is disabled in the test environment" do
    assert_not InertiaRails.configuration.ssr_enabled
  end
end
