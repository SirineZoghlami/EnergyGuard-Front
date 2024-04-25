import { createStore } from 'redux';
import customThunkMiddleware from './thunk'; 
import rootReducer from '../reducers/index';

const store = createStore(rootReducer, customThunkMiddleware);

export default store;
