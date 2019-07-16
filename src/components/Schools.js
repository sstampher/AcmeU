import React from 'react';
import { connect } from 'react-redux';
import AddStudent from './AddStudent';

function Schools ( props ) {
        
        return <div>
                    < AddStudent />
                    {props.schools.map( item => <li key={item.id}>{item.name + ' ' + 'student count: ' + props.studentCount(item.name)}</li>)}
               </div>
    }

const mapStateToProps = state => ({
    schools: state.data.schools,
    students: state.data.students,
    studentCount: function(schoolName) {
        let targetSchool = state.data.schools.find(school => school.name === schoolName)
        let count = state.data.students.reduce( (acc, item) => {
            if(item.schoolId === targetSchool.id){
                console.log('yes');
                acc += 1;
            }
            return acc;
        }  , 0 )
        return count;
    }
})

export default connect( mapStateToProps )(Schools)
