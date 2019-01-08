import { alertActions } from "./AlterActions";
import { history } from "../helpers/History";
import { userConstants } from "../constants/UserConstants";
import { userService } from "../services/UserServices";

export const login = (email, password) => {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(userConstants.NO_SUCH_LOGIN));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
};

export const logout = () => {
  userService.logout();
  history.push("/login");
  return { type: userConstants.LOGOUT };
};

export const register = user => {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
};

export const getAll = () => {
  return dispatch => {
    dispatch(request());

    userService
      .getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
};

// prefixed function name with underscore because delete is a reserved word in javascript
// FOR USER LIST COMPONENT
// export const _delete = id => {
//   return dispatch => {
//     dispatch(request(id));

//     userService
//       .delete(id)
//       .then(
//         user => dispatch(success(id)),
//         error => dispatch(failure(id, error.toString()))
//       );
//   };

//   function request(id) {
//     return { type: userConstants.DELETE_REQUEST, id };
//   }
//   function success(id) {
//     return { type: userConstants.DELETE_SUCCESS, id };
//   }
//   function failure(id, error) {
//     return { type: userConstants.DELETE_FAILURE, id, error };
//   }
// };

export const _delete = id => {
  userService.delete(id);
  userService.logout();
  history.push("/login");
  return { type: "" };
};
