import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Home ( props ) {

    return <div id="home">
                <h4>Welcome to Acme Schools!</h4>

                <h4>The most popular school is < Link to = {`/schools/${props.mostPopularSchoolValue('id')}`}>{props.mostPopularSchoolValue('name')}</Link> with {props.mostPopularSchoolValue('count')} students enrolled!</h4>

                <h4>The top school is < Link to = {`/schools/${props.topSchool('id')}`}>{props.topSchool('name')}</Link> with an average gpa of {props.topSchool('highest')}!</h4>
           </div>

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

export default connect( mapStateToProps )( Home )