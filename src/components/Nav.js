import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSchools } from '../store/actions/actions';
import { fetchStudents } from '../store/actions/actions';

class Nav extends Component {
    
    componentDidMount(){
        this.props.fetchData();
    }
    
    render(){

        
        return (
            <div>
                    < Link to = '/schools'> Schools ({this.props.schools.length})</Link>
                    < Link to = '/students'> Students ({this.props.students.length})</Link>
                    < Link to = {`/schools/${this.props.mostPopularSchoolValue().school}`}> Most Popular:  ({this.props.mostPopularSchoolValue().count})</Link>
                    < Link to = '/top_school'> Top School ()</Link>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    schools: state.data.schools,
    students: state.data.students,
    mostPopularSchoolValue: function(){

        const countObject = state.data.students.reduce((acc, student) => {

                !acc[student.schoolId] ? acc[student.schoolId] = { count: 1, schoolId: student.schoolId } : acc[student.schoolId].count += 1;
                console.log(acc);
                return acc;


        }, {})

        const mostPopularValue = Object.values(countObject).reduce( ( acc ) => {
            
            Object.values(countObject).reduce( ( count, students ) => {
                if( students.count > count ) {
                    count = students.count
                }

                acc['school'] = students.schoolId
                return acc['count'] = count;

            }, 0)

            return acc;

        }, {})

        let schoolName = state.data.schools.find( school => school.id === mostPopularValue.school );
        console.log(schoolName);
        
        schoolName ? mostPopularValue.schoolName = schoolName.name : 'loading...';

        console.log('mpv', mostPopularValue);
        return mostPopularValue;

    }
})

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchData: () => {
            dispatch(fetchSchools()),
            dispatch(fetchStudents())
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Nav )
