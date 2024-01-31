class CreateInvestments < ActiveRecord::Migration[7.1]
  def change
    create_table :investments do |t|
      t.string :company
      t.integer :year
      t.integer :amount
      t.text :about
      t.string :status
      t.string :link

      t.timestamps
    end
  end
end
