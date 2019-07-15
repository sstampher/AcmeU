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
                    < Link to = '/most_popular'> Most Popular ()</Link>
                    < Link to = '/top_school'> Top School ()</Link>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    schools: state.data.schools,
    students: state.data.students,
    student: state.data.student,
    mostPopular: state.data.students
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => {
            dispatch(fetchSchools()),
            dispatch(fetchStudents())
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Nav)
