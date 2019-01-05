import { userService } from "../services/UserServices";

export const handleResponse = response => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // logout if 401 response returned from api
      if (response.status === 401) {
        userService.logout();
        window.location.reload(true);
      }

      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};
