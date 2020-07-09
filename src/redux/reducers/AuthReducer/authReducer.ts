import {Map} from 'immutable';
import {AuthActionTypes} from '../../../constants';
import {IAction} from '../../../models/GeneralModels';

const sessionMap = Map<string, any>();

export const authReducer = (
  session = sessionMap,
  action: IAction,
): Map<any, any> => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return session.merge(action.payload.data);

    case AuthActionTypes.LOGIN_FAIL:
      return session.merge(
        Map({
          error: action.payload.data,
        }),
      );

    case AuthActionTypes.CLEAR_AUTHENTICATION_ERROR:
      if (session.get('error')) {
        return session.delete('error');
      }
      return session;
  }
  return session;
};
