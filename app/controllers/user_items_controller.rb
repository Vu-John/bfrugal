require 'open-uri'
class UserItemsController < ApplicationController
  before_action :authenticate_user!

  def create
    if !params.key?(:url) || params[:url].blank?
      render json: { error: 'URL param is blank or does not exist' }, status: 400
    else
      user = current_user
      item = Item.find_by_url(params[:url])

      if item.blank?
        # parse webpage for item data and save to db
        url = params[:url]
        data = Nokogiri::HTML(open(url))
        name = data.css('.product-title').first.children[1].children.text
        amount = data.css('.amount').first.text
        img_url = data.css('.gallery-image-container').css('img').first.attributes['src'].value
        item = Item.new(name: name, current_price: amount, lowest_price: amount, url: url, img_url: img_url)
        item.save
      elsif UserItem.where(user_id: user.id, item_id: item.id).count > 0
        render json: { error: 'Item already added' }, status: 400
        return
      end

      UserItem.create(user: user, item: item)
      # TODO: Serialize
      render json: item
    end
  end
end
