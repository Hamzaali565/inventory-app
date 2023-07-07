import { BASE_URL, SET_LOGIN, SET_LOGIN_TOGGLE } from "./actionType";

const initialState = {
  login: null,
  url: "http://localhost:5001",
  toggle: null,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case SET_LOGIN_TOGGLE:
      return {
        ...state,
        toggle: action.payload,
      };
    case BASE_URL:
      return {
        ...state,
        url: state.url,
      };
    default:
      return state;
  }
};
