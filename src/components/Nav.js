import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSchools } from '../store/actions/postActions';
import { fetchStudents } from '../store/actions/postActions';

class Nav extends Component {
    
    componentDidMount(){
        this.props.fetchSchools(); 
        this.props.fetchStudents();
    }
    
    render(){
        console.log('props sent to Nav component', this.props.schools);
        return (
            <div>
                    < Link to = '/schools'> Schools ({this.props.schools.length})</Link>
                    < Link to = '/students'> Students ({this.props.students.length})</Link>
                    < Link to = '/most_popular'> Most Popular ({this.props.schools.length})</Link>
                    < Link to = '/top_school'> Top School ({this.props.schools.length})</Link>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    schools: state.schools.items,
    students: state.schools.students
})

const mapDispatchToProps = dispatch => ({
    fetchSchools: () => dispatch(fetchSchools()),
    fetchStudents: () => dispatch(fetchStudents())
})

export default connect( mapStateToProps, mapDispatchToProps )(Nav)
