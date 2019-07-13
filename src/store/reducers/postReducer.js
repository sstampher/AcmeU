// This is a reducer that deals with all api get and post requests

import { FETCH_SCHOOLS , NEW_STUDENT, FETCH_STUDENTS} from '../actions/types';

const initialState = {
    students: [],
    items: [], // this is going to represent the things we get from a fetch request action
    item: {} // this is for a single post
}

export default function ( state = initialState, action ) {
    switch(action.type){
        
        case FETCH_SCHOOLS :
            console.log('get schools reducer is working')
            return {
                ...state,
                items: action.payload
            }
        case FETCH_STUDENTS :
            console.log('get students reducer is working')
            return {
                ...state,
                students: action.payload
            }
        case NEW_STUDENT :
            console.log('new student reducer is working')
            return {
                ...state,
                item: action.payload
            }

        default:
        return state;
    }
}