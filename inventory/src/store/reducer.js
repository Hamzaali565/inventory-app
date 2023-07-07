import { BASE_URL, SET_LOGIN } from "./actionType";

const initialState = {
  login: null,
  url: "http://192.168.3.105:3001",
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
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
