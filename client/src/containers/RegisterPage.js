import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../components/Loader";

import { register } from "../actions/UserActions";

class RegisterPage extends Component {
  state = {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    submitted: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.email && user.password) {
      dispatch(register(user));
    }
  };

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className="login-register-container col-md-6 col-md-offset-3">
        <h2>
          <span>Register</span>
          <span>{registering && <Loader />}</span>
        </h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !user.firstName ? " has-error" : "")
            }
          >
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={user.firstName}
              onChange={this.handleChange}
            />
            {submitted && !user.firstName && (
              <div className="help-block">First Name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.lastName ? " has-error" : "")
            }
          >
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={user.lastName}
              onChange={this.handleChange}
            />
            {submitted && !user.lastName && (
              <div className="help-block">Last Name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.email ? " has-error" : "")
            }
          >
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={user.email}
              onChange={this.handleChange}
            />
            {submitted && !user.email && (
              <div className="help-block">Email is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { registering } = state.registration;
  return {
    registering
  };
};

export default connect(mapStateToProps)(RegisterPage);
