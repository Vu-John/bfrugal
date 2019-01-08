class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: %i[show destroy]

  def index
    @users = User.all

    render json: @users
  end

  def show
    if @user == current_user
      render json: @user
    else
      render json: { error: 'You do not have permission to view this user\'s info' }, status: 400
    end
  end

  def destroy
    if @user == current_user
      @user.destroy
    else
      render json: { error: 'You do not have permission to delete this user' }, status: 400
    end
  end

  def my_items
    @user = current_user
    user_items = current_user.items
    render json: user_items
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end
end
