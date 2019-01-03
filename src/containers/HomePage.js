import React, { Component } from "react";
import { connect } from "react-redux";

import { getAll as getAllItems } from "../actions/ItemActions";
import { _delete, getAll, logout } from "../actions/UserActions";

class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(getAll());
    this.props.dispatch(getAllItems());
  }

  handleDeleteUser = id => {
    return e => this.props.dispatch(_delete(id));
  };

  handleLogout = () => {
    this.props.dispatch(logout());
  };

  render() {
    const { items, user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.items && (
          <ul>
            {users.items.map((user, index) => (
              <li key={user.id}>
                {user.firstName + " " + user.lastName}
                {user.deleting ? (
                  <em> - Deleting...</em>
                ) : user.deleteError ? (
                  <span className="error"> - ERROR: {user.deleteError}</span>
                ) : (
                  <span>
                    {" "}
                    -{" "}
                    <a
                      href="https://www.google.com"
                      onClick={this.handleDeleteUser(user.id)}
                    >
                      Delete
                    </a>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        <p>You're Items!!</p>
        {items.loading && <em>Loading your items...</em>}
        {items.items && (
          <ul>
            {items.items.map((item, index) => (
              <li key={item.id}>
                <p>{item.name}</p>
                <p>{item.currentPrice}</p>
                <p>{item.lowestPrice}</p>
                <img src={item.imgUrl} alt="product" />
              </li>
            ))}
          </ul>
        )}
        <p>
          <button
            className="btn btn-primary"
            onClick={() => this.handleLogout()}
          >
            Logout
          </button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { authentication, items, users } = state;
  const { user } = authentication;
  return {
    items,
    user,
    users
  };
};

export default connect(mapStateToProps)(HomePage);
