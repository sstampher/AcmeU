import React from 'react';
import { connect } from 'react-redux';
import UpdateStudent from './UpdateStudent';
import EnrollStudent from './EnrollStudent';

import { deleteStudent } from '../store/actions/actions';

function EnrolledStudents( props ){

        return <div>
                    <h2 id="schoolHeading">Students Enrolled at {props.schoolName(props.match.params.id)}</h2>
                    < EnrollStudent schoolId = { props.match.params.id } />
                    <div id="element">
                        {props.enrolledStudents(props.match.params.id).map( item => <li key={item.id}>{item.firstName + ' ' + item.lastName}
                        <br />
                        GPA: {item.gpa}
                        <br /><br />
                        <img src={props.idToImage(item.schoolId)}/>< UpdateStudent defaultSchoolId = {item.schoolId} defaultStudentId = {item.id} />
                        <br />
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
    },
    idToImage: function(id){
        let school = state.data.schools.find(item => item.id===id);
        let image = school ? school.url : '';
        return image
    }
})

export default connect( mapStateToProps, { deleteStudent } )( EnrolledStudents )

