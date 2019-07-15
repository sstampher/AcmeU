import React from 'react';
import { connect } from 'react-redux';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent'

function Students( props ){
        
        return <div>
                    < AddStudent />
                    {props.students.map( item => <li key={item.id}>{item.firstName + ' ' + item.lastName}< UpdateStudent defaultSchoolId = {item.schoolId} /></li>)}

               </div>

}

const mapStateToProps = state => ({
    students: state.data.students,
    student: state.data.student
})

export default connect( mapStateToProps )(Students)