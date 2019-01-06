require 'open-uri'

include UrlHelper

class UserItemsController < ApplicationController
  before_action :authenticate_user!

  def create
    # check if params exist or null
    if !params.key?(:url) || params[:url].blank?
      render json: { error: 'URL param is blank or does not exist' }, status: 400
      return
    end

    user = current_user
    item = Item.find_by_url(params[:url])

    if item.blank? # add item in db
      item = parse_url(params[:url])
    elsif UserItem.where(user_id: user.id, item_id: item.id).count > 0 # user already has item
      render json: { error: 'Item already added' }, status: 400
      return
    end

    if !item.nil?
      # create a user item assoc
      UserItem.create(user: user, item: item)
      # TODO: Serialize
      render json: item
    else
      render json: { error: 'URL not supported' }, status: 400
      return
    end
  end
end
