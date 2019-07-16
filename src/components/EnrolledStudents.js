import React from 'react';
import { connect } from 'react-redux';
import UpdateStudent from './UpdateStudent';
import { deleteStudent } from '../store/actions/actions';

function EnrolledStudents( props ){

        return <div>
                    {props.enrolledStudents(props.match.params.id).map( item => <li key={item.id}>{item.firstName + ' ' + item.lastName}< UpdateStudent defaultSchoolId = {item.schoolId} defaultStudentId = {item.id} />
                    < button onClick = {() => props.deleteStudent(item.id)} >Delete Student</button></li>)}

               </div>

}


const mapStateToProps = state => ({
    enrolledStudents: function( schoolId ){
        const enrolledStudents = state.data.students.filter( student => student.schoolId === schoolId);
        return enrolledStudents;
        },
    student: state.data.student,
    schools: state.data.schools
})

export default connect( mapStateToProps, { deleteStudent } )( EnrolledStudents )

