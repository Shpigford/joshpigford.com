class CreatePodcasts < ActiveRecord::Migration[7.1]
  def change
    create_table :podcasts do |t|
      t.string :name
      t.string :link

      t.timestamps
    end
  end
end
