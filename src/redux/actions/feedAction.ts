import {createAction} from 'redux-actions';
import {FeedActionTypes} from '../../constants';

export const getFeedAction = createAction(FeedActionTypes.FEED_GET);
