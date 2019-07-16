import React from 'react';
import { connect } from 'react-redux';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';
import { deleteStudent } from '../store/actions/actions';

function Students( props ){
        
        return <div>
                    < AddStudent />
                    {props.students.map( item => <li key={item.id}>{item.firstName + ' ' + item.lastName}< UpdateStudent defaultSchoolId = {item.schoolId} defaultStudentId = {item.id} />
                    < button onClick = {() => props.deleteStudent(item.id)} >Delete</button></li>)}

               </div>

}


const mapStateToProps = state => ({
    students: state.data.students,
    student: state.data.student
})

export default connect( mapStateToProps, { deleteStudent } )(Students)