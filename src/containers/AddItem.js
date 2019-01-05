import React from "react";
import { connect } from "react-redux";
import { addItem } from "../actions/ItemActions";

const AddItem = ({ dispatch }) => {
  let input;
  return (
    <div className="add-item-container">
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addItem(input.value));
          input.value = "";
        }}
      >
        <label htmlFor="url">URL</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Best Buy Product URL..."
            ref={node => (input = node)}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Add Item
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default connect()(AddItem);
