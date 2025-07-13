class CreateOwnedArts < ActiveRecord::Migration[7.1]
  def change
    create_table :owned_arts do |t|
      t.string :name
      t.text :description
      t.string :token_id
      t.string :contract_address
      t.string :contract_name
      t.string :collection_name
      t.string :collection_slug
      t.string :image_url
      t.jsonb :metadata
      t.boolean :visible, default: true
      t.string :external_url
      t.string :blockchain, default: 'ethereum'
      t.string :token_type
      t.datetime :last_synced_at

      t.timestamps
    end

    add_index :owned_arts, [:contract_address, :token_id], unique: true
    add_index :owned_arts, :visible
  end
end
