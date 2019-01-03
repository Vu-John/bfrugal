import { itemConstants } from "../constants/ItemConstants";

export function items(state = {}, action) {
  switch (action.type) {
    case itemConstants.GET_ALL_REQUEST:
      return {
        loading: true
      };
    case itemConstants.GET_ALL_SUCCESS:
      return {
        items: action.items
      };
    case itemConstants.GET_ALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
