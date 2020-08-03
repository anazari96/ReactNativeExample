import {put, call, fork} from 'redux-saga/effects';
import {api} from '../../utils/api';
import createFlow from '../../utils/createFlow';
import {FeedActionTypes} from '../../constants';

function* fetchFeedWorker() {
  try {
    yield put({type: FeedActionTypes.FEED_GET_LOADING, loading: true});
    const posts = yield call(api.get, '/posts');
    yield put({type: FeedActionTypes.FEED_GET_SUCCESSFUL, payload: posts});
  } catch (error) {
    yield put({type: FeedActionTypes.FEED_GET_ERROR, error});
  }
}

export default function* () {
  yield fork(createFlow, FeedActionTypes.FEED_GET, fetchFeedWorker);
}
