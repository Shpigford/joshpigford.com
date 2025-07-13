class AddAnimationUrlToOwnedArts < ActiveRecord::Migration[7.1]
  def change
    add_column :owned_arts, :animation_url, :string
  end
end
