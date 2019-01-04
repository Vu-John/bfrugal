import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const ItemList = ({ items }) => {
  if (items.loading) {
    return <div>Loading your items...</div>;
  } else {
    return (
      <ul className="item-list">
        {items.items.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    );
  }
};

ItemList.propTypes = {
  items: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        currentPrice: PropTypes.string.isRequired,
        lowestPrice: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired
      }).isRequired
    )
  })
};

export default ItemList;
