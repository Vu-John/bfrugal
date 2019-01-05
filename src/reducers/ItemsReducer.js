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
    case itemConstants.ADD_SUCCESS:
      return {
        loading: false,
        items: [...state.items, action.item]
      };
    case itemConstants.ADD_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case itemConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, deleting: true } : item
        )
      };
    case itemConstants.DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    case itemConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            return { ...item, deleteError: action.error };
          }

          return item;
        })
      };
    default:
      return state;
  }
}
