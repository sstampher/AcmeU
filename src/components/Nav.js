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

        console.log(this.props.topSchool());

        return (
            <div id="nav">
                    < Link to = '/'> Acme Schools</Link>
                    < Link to = '/schools'> Schools ({this.props.schools.length})</Link>
                    < Link to = '/students'> Students ({this.props.students.length})</Link>
                    < Link to = {`/schools/${this.props.mostPopularSchoolValue('id')}`}> Most Popular: {this.props.mostPopularSchoolValue('name')} ({this.props.mostPopularSchoolValue('count')})</Link>
                    < Link to = {`/schools/${this.props.topSchool('id')}`}> Top School: {this.props.topSchool('name')} ({this.props.topSchool('count')})</Link>
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

        if (request === 'id'){
            return id;
        }

        if (request === 'name'){
            const targetSchoolId = Object.values(countObject).find( item => item.count === mostPopularValue);
            const _name = targetSchoolId ? state.data.schools.find( school => targetSchoolId.schoolId === school.id) : 'loading' ;
            return _name.name;
        }

    },

    topSchool: function( request ){

        const countObject = state.data.students.reduce((acc, student) => {
            !acc[student.schoolId] ? acc[student.schoolId] = { count: 1, schoolId: student.schoolId, totalgpa: null, average: 0 } : acc[student.schoolId].count += 1, acc[student.schoolId].totalgpa += Number(student.gpa) ;
            return acc;
         }, {})

         console.log("topschool", countObject);

        const combine = Object.values(countObject).map( item => item.average = item.totalgpa/item.count );
        const highest = combine.reduce((acc, item) => {if(item > acc){ acc=item } return acc},0)

        if (request === 'highest'){
            return highest;
        }
        
        const popularSchoolId = Object.values(countObject).find( item => item.average === highest );
        const id = popularSchoolId ? popularSchoolId.schoolId : 'loading';
        
        if (request === 'id'){
            return id;
        }

        if (request === 'name'){
            const popularSchoolId = Object.values(countObject).find( item => item.average === highest );
            const _name = popularSchoolId ? state.data.schools.find( school => popularSchoolId.schoolId === school.id) : 'loading' ;
            return _name.name;
        }

        if (request === 'count'){
            const popularSchoolId = Object.values(countObject).find( item => item.average === highest );
            const count = popularSchoolId ? popularSchoolId.count : 'loading';
            return count;
        }
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
