import {OrderedMap, fromJS} from 'immutable';
import {IAction, IAds} from '../../../models/GeneralModels';
import {FeedActionTypes} from '../../../constants';
import fromJSOrderedMap from 'utils/fromJSOrderedMap';

const feedMap = OrderedMap<string, any>();

export const feedReducer = (
  feed = feedMap,
  action: IAction,
): OrderedMap<string, any> => {
  switch (action.type) {
    case FeedActionTypes.FEED_GET_SUCCESSFUL:
      return feed.merge(
        fromJS(
          action?.payload?.data
            ?.map((v) => {
              return {[v.id]: v};
            })
            .reduce((p, c) => Object.assign(p, c)),
          fromJSOrderedMap,
        ),
      );
  }
  return feed;
};
