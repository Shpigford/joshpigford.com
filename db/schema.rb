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

ActiveRecord::Schema[7.1].define(version: 2025_07_13_120535) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.text "body"
    t.datetime "publish_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "books", force: :cascade do |t|
    t.string "title"
    t.string "link"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "investments", force: :cascade do |t|
    t.string "company"
    t.integer "year"
    t.integer "amount"
    t.text "about"
    t.string "status"
    t.string "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "made_arts", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "series_name"
    t.integer "year"
    t.string "medium"
    t.string "dimensions"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["series_name"], name: "index_made_arts_on_series_name"
    t.index ["slug"], name: "index_made_arts_on_slug", unique: true
  end

  create_table "owned_arts", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "token_id"
    t.string "contract_address"
    t.string "contract_name"
    t.string "collection_name"
    t.string "collection_slug"
    t.string "image_url"
    t.jsonb "metadata"
    t.boolean "visible", default: true
    t.string "external_url"
    t.string "blockchain", default: "ethereum"
    t.string "token_type"
    t.datetime "last_synced_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "animation_url"
    t.index ["contract_address", "token_id"], name: "index_owned_arts_on_contract_address_and_token_id", unique: true
    t.index ["visible"], name: "index_owned_arts_on_visible"
  end

  create_table "podcasts", force: :cascade do |t|
    t.string "name"
    t.string "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.integer "year"
    t.text "description"
    t.text "outcome"
    t.text "notes"
    t.string "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "toys", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "artist"
    t.string "manufacturer"
    t.date "release_date"
    t.string "size"
    t.string "platform"
    t.string "color"
    t.string "series"
    t.integer "original_price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
