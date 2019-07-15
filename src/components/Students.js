import React from 'react';
import { connect } from 'react-redux';
import AddStudent from './AddStudent';

function Students( props ){
        
        return <div>
                    < AddStudent />
                    {props.students.map( item => <li key={item.id}>{item.firstName + ' ' + item.lastName}</li>)}
               </div>

}

const mapStateToProps = state => ({
    students: state.data.students,
    student: state.data.student
})

export default connect( mapStateToProps )(Students)