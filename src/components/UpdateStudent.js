import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store/actions/actions';

 class UpdateStudent extends Component {

    constructor(props){
        super(props)
        this.state = {
            student: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        console.log('in the submit')
        e.preventDefault();
        console.log(this.state);
        this.props.createStudent(this.state);
    }

    handleChange(e){
        e.preventDefault();
        console.log(e.target.name);
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        
        return <form onSubmit = {this.handleSubmit}>
                    <select id={item.id} defaultValue={item.status} onChange={this.handleChange}>
                            {this.state.categories.map(status => <option value = {status}>{status}</option>)}
                    </select>
                    <button type = 'submit'>Enroll</button>
               </form>
    }

}

const mapStateToProps = state => ({
    students: state.data.students,
    schools: state.data.schools,
    student: state.data.student
})


export default connect( mapStateToProps , { updateStudent } )(UpdateStudent)