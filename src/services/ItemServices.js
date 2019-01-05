import { authHeader, handleResponse } from "../helpers";

const addItem = url => {
  const requestOptions = {
    method: "post",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ url })
  };

  return fetch(`/user_items`, requestOptions).then(handleResponse);
};

const getItems = () => {
  const requestOptions = {
    method: "get",
    headers: authHeader()
  };

  return fetch(`/my_items`, requestOptions).then(handleResponse);
};

const _delete = id => {
  const requestOptions = {
    method: "delete",
    headers: authHeader()
  };

  return fetch(`/items/${id}`, requestOptions).then(handleResponse);
};

export const itemService = {
  addItem,
  getItems,
  delete: _delete
};
