import {IAction, IAds} from '../../../models/GeneralModels';
import {AdsActionTypes} from '../../../constants';
import {OrderedMap, fromJS} from 'immutable';

const adsMap = OrderedMap<string, any>();

export const adsReducer = (
  ads = adsMap,
  action: IAction,
): OrderedMap<string, any> => {
  switch (action.type) {
    case AdsActionTypes.ADS_ACTION_GET:
      return ads.merge(
        ads.merge(
          fromJS(
            (action?.payload?.data as IAds[])?.reduce(
              (t: any, v: IAds, ci: number) => {
                if (ci === 1) {
                  const temp = t;
                  t = {};
                  t[temp.id] = temp;
                }
                t[v.id] = v;
                return t;
              },
            ),
          ),
        ),
      );
  }
  return ads;
};
