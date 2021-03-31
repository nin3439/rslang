import { combineReducers } from 'redux';
import { textbook } from './textBookReducer';
import { userReducer } from './userReducer';
import { controllers } from './controllersReduce';

export const combine = () =>
  combineReducers({
    textbook,
    userReducer,
    controllers,
  });
