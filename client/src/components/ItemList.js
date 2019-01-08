import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const ItemList = ({ items, deleteItem }) => {
  if (items.loading) {
    return <div>Loading your items...</div>;
  } else {
    return (
      <div className="item-list container">
        {items.items.map(item => (
          <Item
            key={item.id}
            {...item}
            deleteItem={() => deleteItem(item.id)}
          />
        ))}
      </div>
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
  }),
  deleteItem: PropTypes.func.isRequired
};

export default ItemList;
