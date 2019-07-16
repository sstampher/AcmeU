import { FETCH_SCHOOLS , NEW_STUDENT, FETCH_STUDENTS, UPDATE_STUDENT, DELETE_STUDENT } from '../actions/constants';

const initialState = {
    students: [],
    schools: [], 
}

export default function ( state = initialState, action ) {
    switch(action.type){
        
        case FETCH_SCHOOLS:
            return {
                ...state,
                schools: action.payload
            }
        case FETCH_STUDENTS:
            return {
                ...state,
                students: action.payload
            }
        case NEW_STUDENT:
            return  {
                ...state,
                students: [...state.students, action.payload]
            }
        case UPDATE_STUDENT:
            return  {
                ...state,
                students: [...state.students.map(student => {
                    if(student.id === action.payload.id){
                        return action.payload
                    }
                    return student
                })]
            }
        case DELETE_STUDENT:
            return {
                ...state,
                students: [...state.students.filter(student => student.id !== action.payload)]
            }

        default:
        return state;
    }
}