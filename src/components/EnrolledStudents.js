import React from 'react';
import { connect } from 'react-redux';
import UpdateStudent from './UpdateStudent';
import EnrollStudent from './EnrollStudent';

import { deleteStudent } from '../store/actions/actions';

function EnrolledStudents( props ){

        return <div>
                    < EnrollStudent schoolId = { props.match.params.id } />
                    {props.enrolledStudents(props.match.params.id).map( item => <li key={item.id}>{item.firstName + ' ' + item.lastName}< UpdateStudent defaultSchoolId = {item.schoolId} defaultStudentId = {item.id} />
                    < button onClick = {() => props.deleteStudent(item.id)} >Delete Student</button></li>)}

               </div>

}


const mapStateToProps = state => ({
    enrolledStudents: function( schoolId ){
        const enrolledStudents = state.data.students.filter( student => student.schoolId === schoolId);
        return enrolledStudents;
        }
})

export default connect( mapStateToProps, { deleteStudent } )( EnrolledStudents )

