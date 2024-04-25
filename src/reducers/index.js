import { combineReducers } from 'redux';
import usersReducer from './users';
import authReducer from './authReducers'; 

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer
});

export default rootReducer;
