import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store/actions/postActions';

 class AddStudent extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            SchoolId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        console.log('in the submit')
        e.preventDefault();
        console.log(this.state);
        this.props.createStudent(this.state);
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            SchoolId: ''
        });
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
                    <label>First Name: </label>
                    <input type = 'text' name = 'firstName' value = {this.state.firstName} onChange = {this.handleChange}/><br/>
                    <label>Last Name: </label>
                    <input type = 'text' name = 'lastName' value = {this.state.lastName} onChange = {this.handleChange}/><br/>
                    <label>Email: </label>
                    <input type = 'text' name = 'email' value = {this.state.email} onChange = {this.handleChange}/><br/>
                    <label>GPA: </label>
                    <input type = 'text' name = 'gpa' value = {this.state.gpa} onChange = {this.handleChange}/><br/>
                    <label>Enroll at: </label>
                    <input type = 'select' name = 'SchoolId' value = {this.state.SchoolId} onChange = {this.handleChange}/><br/>
                    <button type = 'submit'>Submit</button>
               </form>
    }

}

export default connect( null, { createStudent } )(AddStudent)