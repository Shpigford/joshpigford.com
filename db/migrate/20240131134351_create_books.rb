class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :link
      t.string :category

      t.timestamps
    end
  end
end
