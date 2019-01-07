import React from "react";
import PropTypes from "prop-types";

const Item = ({
  id,
  name,
  currentPrice,
  lowestPrice,
  url,
  imgUrl,
  deleteItem
}) => (
  <li className="item-container">
    <img className="product-img" src={imgUrl} alt={name} />
    <h5>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </h5>
    <div>{currentPrice}</div>
    <div className="lowest-price">{lowestPrice} Lowest Price Seen</div>
    <div className="center-block">
      <button className="btn btn-danger" onClick={deleteItem}>
        delete
      </button>
    </div>
  </li>
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
  currentPrice: PropTypes.string.isRequired,
  lowestPrice: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default Item;