# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_09_184728) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "articles", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "publish_at"
    t.string "slug"
    t.string "title"
    t.datetime "updated_at", null: false
  end

  create_table "books", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.string "link"
    t.string "title"
    t.datetime "updated_at", null: false
  end

  create_table "guestbook_entries", force: :cascade do |t|
    t.string "country_code"
    t.datetime "created_at", null: false
    t.string "homepage"
    t.string "ip_hash"
    t.text "message"
    t.string "moderation_reason"
    t.string "name"
    t.jsonb "reactions", default: {}, null: false
    t.string "status", default: "pending", null: false
    t.datetime "updated_at", null: false
    t.index ["ip_hash", "created_at"], name: "index_guestbook_entries_on_ip_hash_and_created_at"
    t.index ["status", "created_at"], name: "index_guestbook_entries_on_status_and_created_at"
  end

  create_table "investments", force: :cascade do |t|
    t.text "about"
    t.integer "amount"
    t.string "company"
    t.datetime "created_at", null: false
    t.string "link"
    t.string "status"
    t.datetime "updated_at", null: false
    t.integer "year"
  end

  create_table "made_arts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "dimensions"
    t.string "medium"
    t.string "series_name"
    t.string "slug"
    t.string "title"
    t.datetime "updated_at", null: false
    t.integer "year"
    t.index ["series_name"], name: "index_made_arts_on_series_name"
    t.index ["slug"], name: "index_made_arts_on_slug", unique: true
  end

  create_table "owned_arts", force: :cascade do |t|
    t.string "animation_url"
    t.string "blockchain", default: "ethereum"
    t.string "collection_name"
    t.string "collection_slug"
    t.string "contract_address"
    t.string "contract_name"
    t.string "contract_slug"
    t.datetime "created_at", null: false
    t.text "description"
    t.string "external_url"
    t.string "image_url"
    t.datetime "last_synced_at"
    t.jsonb "metadata"
    t.string "name"
    t.string "token_id"
    t.string "token_type"
    t.datetime "updated_at", null: false
    t.boolean "visible", default: true
    t.index ["contract_address", "token_id"], name: "index_owned_arts_on_contract_address_and_token_id", unique: true
    t.index ["visible"], name: "index_owned_arts_on_visible"
  end

  create_table "podcasts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "link"
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "link"
    t.string "name"
    t.text "notes"
    t.text "outcome"
    t.string "slug"
    t.datetime "updated_at", null: false
    t.integer "year"
  end

  create_table "toys", force: :cascade do |t|
    t.string "artist"
    t.string "color"
    t.datetime "created_at", null: false
    t.text "description"
    t.string "manufacturer"
    t.string "name"
    t.integer "original_price"
    t.string "platform"
    t.date "release_date"
    t.string "series"
    t.string "size"
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "password_digest"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
