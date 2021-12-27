import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

function alertReducer(state = initialState, action) {
    const { type, payload } = action;

    //switch (action.type) {
    switch (type) {
        case SET_ALERT:
            //return [...state, action.payload];    
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload);  //?- payload = id dans ce cas. Return all alert except what match with the payload  
        default:
            return state;
    }
}

export default alertReducer;