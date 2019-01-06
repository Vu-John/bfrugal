require 'domainatrix'
require 'nokogiri'
require 'open-uri'

module UrlHelper
  def check_price(item)
    logger = Logger.new(STDOUT)

    url = item.url
    domain = Domainatrix.parse(url).domain
    data = Nokogiri::HTML(open(url))

    price = ''

    case domain
    when 'bestbuy'
      price = data.css('.amount').first.text
    when 'canadacomputers'
      price = data.css('.h2-big').first.children[1].children.text
    when 'thesource'
      price = data.css('.price').first.children[0].text.strip + data.css('.price').first.children[1].text.strip
    end

    if price < item.lowest_price
      logger.debug item.name.to_s
      logger.debug "OLD - current_price: #{item.current_price}, lowest_price: #{item.lowest_price}"
      logger.debug "NEW - current_price: #{price}, lowest_price: #{price}"
      item.update(current_price: price, lowest_price: price)
    elsif price != item.current_price
      logger.debug item.name.to_s
      logger.debug "OLD - current_price: #{item.current_price}"
      logger.debug "NEW - current_price: #{price}"
      item.update(current_price: price)
    end

    item
  end

  def parse_url(_url)
    domain = Domainatrix.parse(_url).domain
    data = Nokogiri::HTML(open(_url))

    name = ''
    price = ''
    img_url = ''

    case domain
    when 'bestbuy'
      name = data.css('.product-title').first.children[1].children.first.text
      price = data.css('.amount').first.text
      img_url = data.css('.gallery-image-container').css('img').first.attributes['src'].value
    when 'canadacomputers'
      name = data.css('.product-title').first.children.children.text
      price = data.css('.h2-big').first.children[1].children.text
      img_url = data.css('.slick-image').first.attributes.first[1].text
    when 'memoryexpress'
      name = data.css('.c-capr-header').css('h1').children[1].text.strip + data.css('.c-capr-header').css('h1').children[2].text.strip
      price = data.css('.GrandTotal').children[1].children[2].text.strip
      img_url = data.css('.c-capr-images__focus').css('img').first.attributes.first[1].value
    when 'thesource'
      name = data.css('.pdp-name').first.children[1].children.first.text
      price = data.css('.price').first.children[0].text.strip + data.css('.price').first.children[1].text.strip
    end

    item = nil

    if !name.blank? && !price.blank?
      item = Item.new(name: name, current_price: price, lowest_price: price, url: _url, img_url: img_url)
      item.save
    end

    item
  end
end
