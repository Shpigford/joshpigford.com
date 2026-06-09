InertiaRails.configure do |config|
  config.version = ViteRuby.digest
  config.encrypt_history = true
  config.always_include_errors_hash = true
  config.use_script_element_for_initial_page = true
  config.use_data_inertia_head_attribute = true
  # No SSR worker runs under `rails test`; without the test gate every Inertia
  # render in tests attempts localhost:13714, logs an SSRError, and falls back
  # to CSR — noise, dead latency, and nondeterminism if the port is in use.
  config.ssr_enabled = ViteRuby.config.ssr_build_enabled && !Rails.env.test?
  config.ssr_bundle = Rails.public_path.join("vite-ssr/ssr.js").to_s

  # In production, derive the worker URL from the same INERTIA_SSR_PORT that
  # vite.config.ts bakes into the SSR bundle, so Rails and the worker can't
  # drift. The port must be unique per Inertia+SSR app on a shared host.
  # Everywhere else this clobbers to nil: Conductor may inject INERTIA_SSR_URL
  # pointing at a dead process (the gem auto-reads INERTIA_* env vars), and
  # nil lets the renderer fall through to Vite dev's /__inertia_ssr endpoint.
  config.ssr_url =
    if Rails.env.production? && ENV["INERTIA_SSR_PORT"]
      "http://127.0.0.1:#{ENV['INERTIA_SSR_PORT']}"
    end

  # Pin the layout to an explicit name so the SSR-body render path
  # (render html: ssr['body'], layout:) always resolves application.html.erb.
  # The gem default (true) makes Rails *require* a layout matching the request's
  # first format; a non-HTML Accept header then raises "no default layout".
  config.layout = "application"

  # Surface SSR failures. Without this, an SSR error silently falls back to CSR
  # (empty <div id="app"></div>) and there's no signal in the logs.
  config.on_ssr_error = lambda do |error, page|
    Rails.logger.error "[Inertia SSR] #{error.class}: #{error.message}"
    Rails.logger.error "[Inertia SSR] component=#{page[:component]} url=#{page[:url]}"
    Rails.logger.error error.backtrace.first(10).join("\n") if error.backtrace
  end
end
