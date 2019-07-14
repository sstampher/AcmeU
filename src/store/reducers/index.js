// This reducer combines all of the other reducers

import {combineReducers} from 'redux';
import postReducer from './reducer';

export default combineReducers({
  data: postReducer
})
