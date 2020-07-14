import {createAction} from 'redux-actions';
import {AdsActionTypes} from '../../../constants';
import {IAds} from 'src/models/GeneralModels';

export const getAdsAction = createAction(
  AdsActionTypes.ADS_ACTION_GET,
  (values: IAds[]) => ({
    data: values,
  }),
);
