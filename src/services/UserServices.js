import { authHeader } from "../helpers";

const login = (email, password) => {
  const requestOptions = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } })
  };

  return fetch(`/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
};

const logout = () => {
  const requestOptions = {
    method: "delete",
    headers: { "Content-Type": "application/json" }
  };

  // remove user from local storage to log user out
  return fetch(`/logout`, requestOptions).then(localStorage.removeItem("user"));
};

const signup = user => {
  const requestOptions = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: user })
  };

  return fetch(`/signup`, requestOptions).then(handleResponse);
};

const getAll = () => {
  const requestOptions = {
    method: "get",
    headers: authHeader()
  };

  return fetch(`/users`, requestOptions).then(handleResponse);
};

const update = user => {
  const requestOptions = {
    method: "put",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = id => {
  const requestOptions = {
    method: "delete",
    headers: authHeader()
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
};

const handleResponse = response => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // logout if 401 response returned from api
      if (response.status === 401) {
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const userService = {
  login,
  logout,
  signup,
  getAll,
  update,
  delete: _delete
};
