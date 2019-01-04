import React from "react";
import PropTypes from "prop-types";

const Item = ({ name, currentPrice, lowestPrice, url, imgUrl }) => (
  <li className="item-container">
    <img className="product-img" src={imgUrl} alt={name} />
    <h5>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </h5>
    <div>{currentPrice}</div>
    <div className="lowest-price">{lowestPrice} Lowest Price Seen</div>
  </li>
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
  currentPrice: PropTypes.string.isRequired,
  lowestPrice: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired
};

export default Item;
