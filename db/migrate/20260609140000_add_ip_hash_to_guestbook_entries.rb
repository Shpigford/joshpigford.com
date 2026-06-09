class AddIpHashToGuestbookEntries < ActiveRecord::Migration[7.1]
  def change
    add_column :guestbook_entries, :ip_hash, :string
    add_index :guestbook_entries, [:ip_hash, :created_at]
  end
end
