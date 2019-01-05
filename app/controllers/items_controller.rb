class ItemsController < ApplicationController
  before_action :authenticate_user!

  def destroy
    user = current_user
    item = user.items.find_by_id(params[:id])
    user.items.delete(item)

    # Check if anyone else has item if not delete item from db
    relationship_count = UserItem.where(item_id: item.id).count
    Item.delete(item) if relationship_count.zero?

    render json: {}, status: 200
  end
end
