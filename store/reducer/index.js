import { combineReducers } from 'redux';
import distanceReducer from './distance';

const rootReducer = combineReducers({
    distance: distanceReducer,
});

export default rootReducer;