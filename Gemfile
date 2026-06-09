source "https://rubygems.org"

ruby "3.4.6"

gem "rails", "~> 8.1"

gem "pg"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Inertia.js adapter for Rails [https://github.com/inertiajs/inertia-rails]
gem "inertia_rails", "~> 3.21"

# Vite integration for Rails [https://vite-ruby.netlify.app]
gem "vite_rails", "~> 3.0"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"
gem "aws-sdk-s3", require: false

gem "redcarpet"

# HTTP client for API requests
gem "faraday"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ]

  gem "dotenv-rails"
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
end

group :test do
  # Minitest 6 extracted minitest/mock, which our tests use for stubbing.
  gem "minitest", "~> 5.25"

  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
end
