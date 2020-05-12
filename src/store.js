import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const loggerMiddleware = createLogger({
  collapsed: true,
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export default store;
