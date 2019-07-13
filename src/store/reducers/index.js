// This reducer combines all of the other reducers

import {combineReducers} from 'redux';
import postReducer from './postReducer';

export default combineReducers({
  schools: postReducer
})
