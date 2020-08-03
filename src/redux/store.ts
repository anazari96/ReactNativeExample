import {createStore, Middleware, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './reducers';
import {fromJS} from 'immutable';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware({});

const middlewares: Middleware[] = [sagaMiddleware];

const preloadedState = fromJS({});

export const store = createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);
