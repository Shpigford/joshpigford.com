# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website/portfolio for Josh Pigford built with Ruby on Rails 7.1, featuring content management for articles, projects, investments, podcasts, books, and toys.

## Essential Commands

**Development:**
- `bin/dev` - Start development server with Rails (port 3000) and Tailwind CSS watcher
- `bin/rails server` - Start Rails server only
- `bin/rails console` - Interactive Rails console

**Testing:**
- `bin/rails test` - Run full test suite
- `bin/rails test test/models/article_test.rb` - Run specific test file
- `bin/rails test test/models/article_test.rb:5` - Run specific test line

**Database:**
- `bin/rails db:migrate` - Run pending migrations
- `bin/rails db:seed` - Load seed data
- `bin/rails db:reset` - Drop, create, migrate, and seed database

**Asset Management:**
- `bin/rails assets:precompile` - Compile assets for production
- `bin/rails tailwindcss:build` - Manually build Tailwind CSS

## Architecture Overview

### Authentication System
Custom session-based authentication without Devise. Key components:
- `app/controllers/application_controller.rb` - Contains `authenticate!` and `current_user` helpers
- `app/controllers/sessions_controller.rb` - Handles login/logout
- `app/models/user.rb` - User model with secure password

### Content Types
Each content type follows a similar pattern with:
- Model in `app/models/`
- Controller in `app/controllers/`
- Views in `app/views/[resource]/`
- Admin routes under `/admin/[resource]`

Main content types: articles, projects, investments, podcasts, books, toys

### Frontend Architecture
- **Hotwire Stack**: Stimulus.js for JavaScript behavior, Turbo for navigation
- **Tailwind CSS**: Custom configuration with Inter font and gold color palette
- **Importmap**: JavaScript module management without webpack
- **Markdown**: Redcarpet gem for content rendering

### File Storage
Active Storage configured with AWS S3:
- Images and attachments stored in S3
- Configuration in `config/storage.yml`
- Direct uploads enabled for better performance

### Key Configuration Files
- `config/routes.rb` - URL routing (admin routes require authentication)
- `config/importmap.rb` - JavaScript dependencies
- `config/tailwind.config.js` - Custom Tailwind theme
- `config/database.yml` - PostgreSQL configuration

## Development Workflow Notes

1. Tailwind CSS changes require the watcher running (automatically started with `bin/dev`)
2. JavaScript changes are instantly available via importmap (no build step)
3. Database uses PostgreSQL - ensure it's running locally
4. Test files use fixtures for data (`test/fixtures/`)
5. Admin routes at `/admin/*` require authentication