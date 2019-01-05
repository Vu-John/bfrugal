import { alertActions } from "./AlterActions";
import { itemConstants } from "../constants/ItemConstants";
import { itemService } from "../services/ItemServices";

export const addItem = url => {
  return dispatch => {
    itemService.addItem(url).then(
      item => {
        dispatch(success(item));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function success(item) {
    return { type: itemConstants.ADD_SUCCESS, item };
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

export const _delete = id => {
  return dispatch => {
    dispatch(request(id));

    itemService
      .delete(id)
      .then(
        item => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) {
    return { type: itemConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: itemConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: itemConstants.DELETE_FAILURE, id, error };
  }
};
