class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :current_price, :lowest_price, :url, :img_url
end
