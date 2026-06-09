class AddExtrasToGuestbookEntries < ActiveRecord::Migration[7.1]
  def change
    add_column :guestbook_entries, :country_code, :string
    add_column :guestbook_entries, :reactions, :jsonb, default: {}, null: false
  end
end
