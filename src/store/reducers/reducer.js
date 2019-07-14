import { FETCH_SCHOOLS , NEW_STUDENT, FETCH_STUDENTS} from '../actions/types';

const initialState = {
    students: [],
    schools: [], 
    student: {} 
}

export default function ( state = initialState, action ) {
    switch(action.type){
        
        case FETCH_SCHOOLS :
            return {
                ...state,
                schools: action.payload
            }
        case FETCH_STUDENTS :
            return {
                ...state,
                students: action.payload
            }
        case NEW_STUDENT :
            return  {
                ...state,
                student: action.payload,
            }

        default:
        return state;
    }
}