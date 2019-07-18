import { FETCH_SCHOOLS , NEW_STUDENT, FETCH_STUDENTS, UPDATE_STUDENT, DELETE_STUDENT, ERRORS } from './constants';
import Axios from 'axios';

const _createStudent = ( student ) => ({
    type: NEW_STUDENT,
    payload: student
  });

const _updateStudent = ( response ) => ({
    type: UPDATE_STUDENT,
    payload: response
});

const _deleteStudent = ( response ) => ({
    type: DELETE_STUDENT,
    payload: response
});

const errors = ( response ) => ({
    type: ERRORS,
    payload: response
});

export const deleteStudent = ( id ) => async dispatch => {
    try{
        const api = await Axios.delete( `/api/students/${id}`);
        const response = api.data;
        dispatch( _deleteStudent( response ));
    }
    catch(err){
        console.log('there was an error in deleteStudent')
    }
}

export const updateStudent = ( updateInfo ) => async dispatch => {
    try {
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
        console.log('there was an error in fetchSchools');
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
           console.log('there was an error in fetchStudents');
       }
   
}

export const createStudent = ( studentData ) => async dispatch => {
       try{
           console.log('data sent to thunk:', studentData)
           const student = await Axios.post('/api/students', { studentData });
           const response = student.data;
           dispatch(_createStudent(response))
       }
       catch(err){
           console.log(err.response.data);
           dispatch(errors(err.response.data))
       }
   
}