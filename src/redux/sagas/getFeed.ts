import {put, call} from 'redux-saga/effects';
import {api} from '../../utils/api';

export function* fetchFeed() {
  try {
    const posts = yield call(api.get, '/posts');
    yield put({type: 'POSTS_SUCCESSFUL', posts});
  } catch (error) {
    yield put({type: 'POSTS_FAILED', error});
  }
}
