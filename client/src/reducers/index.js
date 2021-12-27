//?-
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';


export default combineReducers({ //?- All reducers we create
    alert,
    auth
    // profile,
    // post
});