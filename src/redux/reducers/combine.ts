import { combineReducers } from 'redux';
import { textbook } from './textBookReducer';

export const combine = () =>
  combineReducers({
    textbook,
  });
