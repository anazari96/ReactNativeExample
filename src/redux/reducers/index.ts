import {combineReducers} from 'redux-immutable';
import {AuthActionTypes} from '../../constants';
import {IAction} from '../../models/GeneralModels';
import {authReducer} from './AuthReducer/authReducer';
import {adsReducer} from './AdsReducer/adsReducer';

const appReducer = combineReducers<any, IAction, any>({
  authReducer: authReducer,
  adsReducer: adsReducer,
});

export const rootReducer = (
  state: Map<string, any> | undefined,
  action: IAction,
) => {
  if (action.type === AuthActionTypes.LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};
