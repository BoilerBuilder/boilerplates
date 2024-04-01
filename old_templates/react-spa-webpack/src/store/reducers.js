import { combineReducers } from 'redux';
import loadingSlice from './slices/loadingSlice';

const rootReducer = combineReducers({
  loading: loadingSlice,
});

export default rootReducer;
