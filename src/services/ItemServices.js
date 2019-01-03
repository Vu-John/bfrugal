import { authHeader, handleResponse } from "../helpers";

const getItems = () => {
  const requestOptions = {
    method: "get",
    headers: authHeader()
  };

  return fetch(`/my_items`, requestOptions).then(handleResponse);
};

export const itemService = {
  getItems
};
