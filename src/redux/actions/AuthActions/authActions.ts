import {createAction} from 'redux-actions';
import {AuthActionTypes} from '../../../constants';

const loginAction = createAction(AuthActionTypes.LOGIN);
const loginSuccessAction = createAction(AuthActionTypes.LOGIN_SUCCESS);
const loginFailAction = createAction(AuthActionTypes.LOGIN_FAIL);
const logoutAction = createAction(AuthActionTypes.LOGOUT);
const clearAuthenticationError = createAction(
  AuthActionTypes.CLEAR_AUTHENTICATION_ERROR,
);

export {
  loginAction,
  loginSuccessAction,
  loginFailAction,
  logoutAction,
  clearAuthenticationError,
};
