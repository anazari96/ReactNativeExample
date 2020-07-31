import {all, fork} from 'redux-saga/effects';
import {fetchFeed} from './getFeed';

export default function* rootSaga() {
  yield all([fork(fetchFeed)]);
}
