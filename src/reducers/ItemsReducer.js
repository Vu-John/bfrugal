import { itemConstants } from "../constants/ItemConstants";

const initialState = {
  loading: false,
  items: []
};

export function items(state = initialState, action) {
  switch (action.type) {
    case itemConstants.GET_ALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case itemConstants.GET_ALL_SUCCESS:
      return {
        loading: false,
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
