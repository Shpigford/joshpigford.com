class CreateMadeArts < ActiveRecord::Migration[7.1]
  def change
    create_table :made_arts do |t|
      t.string :title
      t.text :description
      t.string :series_name
      t.integer :year
      t.string :medium
      t.string :dimensions
      t.string :slug

      t.timestamps
    end

    add_index :made_arts, :slug, unique: true
    add_index :made_arts, :series_name
  end
end
