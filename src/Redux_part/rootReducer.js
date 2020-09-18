import { combineReducers } from 'redux';
import TodoReducer from './Reducers/TodoReducer';
import FetchUser from './Reducers/FetchUserReducer';
import LoadUser from './Reducers/LoadUserReducer';
import LoadBid from './Reducers/Loadbids';

const rootReducer = combineReducers({
    products: TodoReducer,
    userdate: FetchUser,
    users:LoadUser,
    bids:LoadBid,
  });

export default rootReducer;