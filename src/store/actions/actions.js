import { FETCH_SCHOOLS , NEW_STUDENT, FETCH_STUDENTS, UPDATE_STUDENT } from './constants';
import Axios from 'axios';

const _createStudent = (student) => ({
    type: NEW_STUDENT,
    payload: student
  });

const _updateStudent = (updatedStudent) => ({
    type: UPDATE_STUDENT,
    payload: updatedStudent
});

export const updateStudent = ( updateInfo ) => async dispatch => { // updateInfo: needs schoolId and student id, updateInfo is an object
    try {
        console.log('in update student thunk')
        const api = await Axios.put( `/api/students/${updateInfo.studentId}`, { updateInfo } );
        const response = api.data;
        dispatch( _updateStudent( response ) );

    }
    catch(err){
        console.log('there was an error in updateStudent')
    }
}

export const fetchSchools = () => async dispatch => {
        try{
            const api = await Axios.get('/api/schools');
            const response = api.data;
            dispatch({
                type: FETCH_SCHOOLS ,
                payload: response
            })
        }
        catch(err){
            console.log('there was an error');
        }
    
}

export const fetchStudents = () => async dispatch => {
       try{
           const api = await Axios.get('/api/students');
           const response = api.data;
           dispatch({
               type: FETCH_STUDENTS ,
               payload: response
           })
       }
       catch(err){
           console.log('there was an error');
       }
   
}

export const createStudent = (studentData) => async dispatch => {
       try{
           const student = await Axios.post('/api/students', { studentData });
           const response = student.data;
           console.log('response from axios post request', response)
           dispatch(_createStudent(response))
       }
       catch(err){
           console.log('there was an error');
       }
   
}