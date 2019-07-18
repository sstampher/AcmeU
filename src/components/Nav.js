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
            <div id="nav">
                    < Link to = '/schools'> Schools ({this.props.schools.length})</Link>
                    < Link to = '/students'> Students ({this.props.students.length})</Link>
                    < Link to = {`/schools/${this.props.mostPopularSchoolValue('id')}`}> Most Popular: {this.props.mostPopularSchoolValue('name')} ({this.props.mostPopularSchoolValue('count')})</Link>
                    < Link to = '/top_school'> Top School ()</Link>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    schools: state.data.schools,
    students: state.data.students,
    mostPopularSchoolValue: function( request ){

        const countObject = state.data.students.reduce((acc, student) => {
                !acc[student.schoolId] ? acc[student.schoolId] = { count: 1, schoolId: student.schoolId } : acc[student.schoolId].count += 1;
                return acc;
        }, {})

        console.log("object with counts", countObject);

        const mostPopularValue = Object.values(countObject).reduce( (acc, item) => {
            if(item.count > acc) {
                acc = item.count
            }
            return acc;
        }, 0)

        if (request === 'count'){
            return mostPopularValue;
        }

        const targetSchoolId = Object.values(countObject).find( item => item.count === mostPopularValue);
        const id = targetSchoolId ? targetSchoolId.schoolId : 'loading' ;

        console.log('idddd', id)

        if (request === 'id'){
            return id;
        }

        if (request === 'name'){
            const targetSchoolId = Object.values(countObject).find( item => item.count === mostPopularValue);
            const _name = targetSchoolId ? state.data.schools.find( school => targetSchoolId.schoolId === school.id) : 'loading' ;
            return _name.name;
        }

    },

    mostPopularSchoolId: function(){

        const countObject = state.data.students.reduce((acc, student) => {
            !acc[student.schoolId] ? acc[student.schoolId] = { count: 1, schoolId: student.schoolId } : acc[student.schoolId].count += 1;
            return acc;
         }, {})

         console.log("object with counts", countObject);

         const mostPopularValue = Object.values(countObject).reduce( (acc, item) => {
            if(item.count > acc) {
            acc = item.count
         }
             return acc;
             }, 0)

        const targetSchoolId = Object.values(countObject).find( item => item.count === mostPopularValue);
        const id = targetSchoolId ? targetSchoolId.schoolId : 'loading' ;
        return id;
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
