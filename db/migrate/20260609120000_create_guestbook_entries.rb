class CreateGuestbookEntries < ActiveRecord::Migration[7.1]
  def change
    create_table :guestbook_entries do |t|
      t.string :name
      t.text   :message
      t.string :homepage
      t.string :status, default: "pending", null: false
      t.string :moderation_reason

      t.timestamps
    end

    add_index :guestbook_entries, [:status, :created_at]
  end
end
