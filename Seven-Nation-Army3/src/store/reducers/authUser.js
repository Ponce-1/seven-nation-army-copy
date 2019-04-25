import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/actionTypes';

const initialState = {
  authError: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('Login success!');
      return {
        ...state,
        authError: null,
      };
    case LOGOUT_SUCCESS:
      console.log('Logout success!');
      return {
        ...state,
        authError: null,
      };
    case REGISTER_SUCCESS:
      console.log('Register success!');
      return {
        ...state,
        authError: null,
      };
    case LOGIN_FAIL:
      console.log('Login failed');
      return {
        ...state,
        authError: action.err.message,
      };
    case LOGOUT_FAIL:
      console.log('Logout failed');
      return {
        ...state,
        authError: action.err.message,
      };
    case REGISTER_FAIL:
      console.log('Registration failed');
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
}
