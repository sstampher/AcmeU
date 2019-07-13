import { FETCH_SCHOOLS , NEW_STUDENT, FETCH_STUDENTS } from './types';
import Axios from 'axios';

export const fetchSchools = () => async dispatch => {
     console.log('get thunk is working')
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
    console.log('get thunk (students) is working')
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
    console.log('post thunk is working')
       try{
           const student = await Axios.post('/api/students', { studentData });
           const response = student.data;
           dispatch({
               type: NEW_STUDENT ,
               payload: response
           })
       }
       catch(err){
           console.log('there was an error');
       }
   
}