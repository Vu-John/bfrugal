require 'domainatrix'
require 'nokogiri'
require 'open-uri'

require 'modules/url_helper'

include UrlHelper

namespace :scrape do
  desc 'Go through each item in db and scrape for new data'
  task update_items: :environment do
    Item.all.each do |item|
      check_price(item)
    end
  end
end
