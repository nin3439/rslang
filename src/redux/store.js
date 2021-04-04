import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { combine } from './reducers/combine';

const composeFunc =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;
const composedEnchanters = composeFunc(applyMiddleware(thunk));
export const store = createStore(combine(), composedEnchanters);
