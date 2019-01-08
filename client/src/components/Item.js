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
  <div className="item-container-outter col-md-2 col-sm-1">
    <div className="item-container-inner">
      {imgUrl !== "" ? (
        <img className="product-img" src={imgUrl} alt={name} />
      ) : (
        <img
          className="product-img"
          src="images/no_image_available.png"
          alt="No Image"
        />
      )}
      <h5>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </h5>
      <h6>
        <div>{currentPrice}</div>
        <div className="lowest-price">{lowestPrice} Lowest Price Seen</div>
      </h6>
      <div className="delete-button">
        <button className="btn btn-danger" onClick={deleteItem}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
  currentPrice: PropTypes.string.isRequired,
  lowestPrice: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default Item;
