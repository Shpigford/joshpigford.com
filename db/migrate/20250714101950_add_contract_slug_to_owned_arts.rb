class AddContractSlugToOwnedArts < ActiveRecord::Migration[7.1]
  def change
    add_column :owned_arts, :contract_slug, :string
  end
end
