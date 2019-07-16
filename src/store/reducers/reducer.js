import { FETCH_SCHOOLS , NEW_STUDENT, FETCH_STUDENTS, UPDATE_STUDENT } from '../actions/constants';

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
                students: [...state.students, action.payload]
            }
        case UPDATE_STUDENT :
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>inside update student reducer payload:', action.payload)
            return  {
                ...state,
                students: [...state.students.map(student => {
                    if(student.id === action.payload.id){
                        return action.payload
                    }
                    return student
                })]
            }

        default:
        return state;
    }
}