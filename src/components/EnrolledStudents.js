import React from 'react';
import { connect } from 'react-redux';
import UpdateStudent from './UpdateStudent';
import EnrollStudent from './EnrollStudent';

import { deleteStudent } from '../store/actions/actions';

function EnrolledStudents( props ){

        return <div>
                    <h1 id="schoolHeading">{props.schoolName(props.match.params.id)}</h1>
                    < EnrollStudent schoolId = { props.match.params.id } />
                    <div id="element">
                        {props.enrolledStudents(props.match.params.id).map( item => <li key={item.id}>{item.firstName + ' ' + item.lastName}< UpdateStudent defaultSchoolId = {item.schoolId} defaultStudentId = {item.id} />
                        < button onClick = {() => props.deleteStudent(item.id)} >Delete Student</button></li>)}
                    </div>

               </div>

}


const mapStateToProps = state => ({
    schools: state.data.schools,
    enrolledStudents: function( schoolId ){
        const enrolledStudents = state.data.students.filter( student => student.schoolId === schoolId);
        return enrolledStudents;
        },
    schoolName: function(id){
        let school = state.data.schools.find( school => id === school.id);
        let _school = school ? school.name: 'loading';
        return _school;
    }
})

export default connect( mapStateToProps, { deleteStudent } )( EnrolledStudents )

