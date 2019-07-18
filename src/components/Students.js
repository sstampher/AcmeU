import React from 'react';
import { connect } from 'react-redux';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';
import { deleteStudent } from '../store/actions/actions';

function Students( props ){
        
        return <div>

                    < AddStudent />
                    <div id="element">
                    {props.students.map( item => <li id="elementContainer" key={item.id}>{item.firstName + ' ' + item.lastName}
                    <br/>
                    GPA : {item.gpa}
                    <br/>
                    <img src={props.idToImage(item.schoolId)}/>< UpdateStudent defaultSchoolId = {item.schoolId} defaultStudentId = {item.id} />
                    < button onClick = {() => props.deleteStudent(item.id)} >Delete</button></li>)}
                    </div>

               </div>

}

const mapStateToProps = state => ({
    students: state.data.students,
    schools: state.data.schools,
    student: state.data.student,
    idToImage: function(id){
        let school = state.data.schools.find(item => item.id===id);
        let image = school ? school.url : '';
        return image
    }
})

export default connect( mapStateToProps, { deleteStudent } )(Students)