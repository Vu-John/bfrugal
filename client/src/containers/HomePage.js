import React, { Component } from "react";
import { connect } from "react-redux";

import AddItem from "../containers/AddItem";
import ItemContainer from "../containers/ItemContainer";

import { logout, _delete } from "../actions/UserActions";

class HomePage extends Component {
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  handleDeleteAccount = id => {
    this.props.dispatch(_delete(id));
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>
          <div className="btn-toolbar">
            Hi {user.firstName}!
            <button
              className="btn btn-primary pull-right"
              onClick={() => this.handleLogout()}
            >
              Logout
            </button>
            <button
              className="btn btn-danger pull-right"
              onClick={() => this.handleDeleteAccount(user.id)}
            >
              Delete Account
            </button>
          </div>
        </h1>
        <p />
        <AddItem />
        <ItemContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
};

export default connect(mapStateToProps)(HomePage);
