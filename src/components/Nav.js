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
                    < Link to = '/most_popular'> Most Popular:  ({this.props.mostPopularSchoolValue()})</Link>
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
            !acc[student.schoolId] ? acc[student.schoolId] = 1 : acc[student.schoolId] += 1;
            console.log(acc);
            return acc;
        }, {})

        const mostPopularValue = Object.values(countObject).reduce( (acc, item) => {
            if( item > acc ){
                acc = item;
            }

            return acc;
        },0)

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
