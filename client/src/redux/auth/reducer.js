import { AuthTypes } from "./types";

const InitialState = {
  isAuth: false,
  user: {},
  errors: null,
  loading: false,
};

export default function (state = InitialState, action) {
  switch (action.type) {
    //register
    case AuthTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AuthTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        errors: null,
        loading: false,
      };
    case AuthTypes.REGISTER_USER_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };

    //login
    case AuthTypes.LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AuthTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        errors: null,
        loading: false,
      };
    case AuthTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuth: false,
        errors: action.payload,
        loading: false,
      };
    case AuthTypes.SET_USER_LOGGED:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case AuthTypes.LOGOUT_USER:
      return {
        ...state,
        isAuth: false,
        user: {},
      };
    case AuthTypes.CLEAR_STATE:
      return {
        ...state,
        errors: {},
      };

    default:
      return state;
  }
}
