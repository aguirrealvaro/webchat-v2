import { AuthTypes } from "./types";
import { socket } from "../../services/socketio";

import { 
  registerUser as registerUserAPI,
  loginUser as loginUserAPI
} from '../../services/api'

export const registerUserRequest = dataRegister => async dispatch => {
  dispatch({ type: AuthTypes.REGISTER_USER_REQUEST });
  try {
    //await axios.post(`${BASE_URL}/user/register`, dataRegister);
    await registerUserAPI(dataRegister)
    const dataLogin = {
      username: dataRegister.username,
      password: dataRegister.password
    };
    dispatch(registerUserSuccess(dataLogin));
  } catch (err) {
    dispatch(registerUserFailure(err.response.data.errors));
  }
};

export const registerUserSuccess = dataLogin => async dispatch => {
  dispatch({ type: AuthTypes.REGISTER_USER_SUCCESS });
  dispatch(loginUserRequest(dataLogin));

  socket.emit("getUsers");
};

export const registerUserFailure = errors => async dispatch => {
  dispatch({
    type: AuthTypes.REGISTER_USER_FAILURE,
    payload: errors
  });
};

export const loginUserRequest = dataLogin => async dispatch => {
  dispatch({ type: AuthTypes.LOGIN_USER_REQUEST });
  try {
    const response = await loginUserAPI(dataLogin)
    dispatch(loginUserSuccess(response.data));
  } catch (err) {
    dispatch(loginUserFailure(err.response.data.errors));
  }
};

export const loginUserSuccess = response => async dispatch => {
  const { token, user } = response;
  localStorage.setItem("token", token);
  dispatch({
    type: AuthTypes.LOGIN_USER_SUCCESS,
    payload: user
  });
};

export const loginUserFailure = errors => async dispatch => {
  dispatch({
    type: AuthTypes.LOGIN_USER_FAILURE,
    payload: errors
  });
};

export const setUserLogged = user => async dispatch => {
  dispatch({
    type: AuthTypes.SET_USER_LOGGED,
    payload: user
  });
};

export const logOutUser = () => async dispatch => {
  localStorage.removeItem("token");
  dispatch({ type: AuthTypes.LOGOUT_USER });
};

export const clearErrors = ()=> dispatch=>{
  dispatch({type: AuthTypes.CLEAR_STATE})
}
