import { alertActions } from "./AlterActions";
import { itemConstants } from "../constants/ItemConstants";
import { itemService } from "../services/ItemServices";

export const addItem = url => {
  return dispatch => {
    itemService.addItem(url).then(
      user => {
        dispatch(success());
        window.location.reload();
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function success(url) {
    return { type: itemConstants.ADD_SUCCESS, url };
  }
  function failure(error) {
    return { type: itemConstants.ADD_FAILURE, error };
  }
};

export const getAll = () => {
  return dispatch => {
    dispatch(request());

    itemService
      .getItems()
      .then(
        items => dispatch(success(items)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return { type: itemConstants.GET_ALL_REQUEST };
  }
  function success(items) {
    return { type: itemConstants.GET_ALL_SUCCESS, items };
  }
  function failure(error) {
    return { type: itemConstants.GET_ALL_FAILURE, error };
  }
};
