require 'open-uri'
class UserItemsController < ApplicationController
  before_action :authenticate_user!

  def create
    if params.key?(:url) && !params[:url].blank?
      item = Item.find_by_url(params[:url])
      if item.blank?
        # parse webpage for item data and save to db
        url = params[:url]
        data = Nokogiri::HTML(open(url))
        name = data.css('.product-title').first.children[1].children.text
        amount = data.css('.amount').text
        img_url = data.css('.gallery-image-container').css('img').first.attributes['src'].value
        item = Item.new(name: name, current_price: amount, lowest_price: amount, url: url, img_url: img_url)
        item.save
      end
      @user_item = UserItem.create(user: current_user, item: item)
      render json: @user_item
    else
      render json: { errors: 'URL param is blank or does not exist' }, status: 400
    end
  end

  def destroy
    item = Item.find(params[:id])
    @user_item = UserItem.where(user_id: current_user.id, item_id: item.id).first
    @user_item.destroy
    render json: {}, status: 200
  end
end
