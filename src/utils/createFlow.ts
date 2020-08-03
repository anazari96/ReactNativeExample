import {actionChannel, take, call} from 'redux-saga/effects';

export default function* createFlow(
  type: string | string[],
  func: (action: any) => void,
) {
  const chan = yield actionChannel(typeof type === 'string' ? type : [...type]);
  while (true) {
    try {
      const action = yield take(chan);
      yield call(func, action);
    } catch (e) {
      console.log(e);
    }
  }
}
