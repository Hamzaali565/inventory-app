import { BASE_URL, SET_LOGIN } from "./actionType";
export const setLogin = (login) => ({
  type: SET_LOGIN,
  payload: login,
});

export const baseurl = () => ({
  type: BASE_URL,
});
