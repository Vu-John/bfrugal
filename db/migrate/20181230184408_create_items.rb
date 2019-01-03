class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.text :name
      t.text :current_price
      t.text :lowest_price
      t.text :url
      t.text :img_url

      t.timestamps
    end
  end
end
