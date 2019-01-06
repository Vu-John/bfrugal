class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.price_drop.subject
  #
  def price_drop(user, item, new_price)
    @user = user
    @item = item
    @new_price = new_price

    mail to: user.email, subject: "Price Drop: #{item.name}"
  end
end
