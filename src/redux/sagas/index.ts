import {all, fork} from 'redux-saga/effects';
import fetchFeedSaga from './getFeed';

export default function* rootSaga() {
  yield all([fork(fetchFeedSaga)]);
}
