import React, { Component } from "react";
import { connect } from "react-redux";

import AddItem from "../containers/AddItem";
import ItemContainer from "../containers/ItemContainer";
import UserContainer from "../containers/UserContainer";

import { logout } from "../actions/UserActions";

class HomePage extends Component {
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <p>
          <button
            className="btn btn-primary"
            onClick={() => this.handleLogout()}
          >
            Logout
          </button>
        </p>
        <UserContainer />
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
