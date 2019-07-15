import { FETCH_SCHOOLS , NEW_STUDENT, FETCH_STUDENTS } from './constants';
import Axios from 'axios';

const _createStudent = (student)=> ({
    type: NEW_STUDENT,
    payload: student
  });

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