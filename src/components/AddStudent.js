import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store/actions/actions';

 class AddStudent extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            schoolId: ''
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
            schoolId: ''
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

        console.log('state in component', this.state)
        
        return <form onSubmit = {this.handleSubmit}>
                    <label>First Name: </label>
                    <input type = 'text' name = 'firstName' value = {this.state.firstName} onChange = {this.handleChange}/><br/>
                    <label>Last Name: </label>
                    <input type = 'text' name = 'lastName' value = {this.state.lastName} onChange = {this.handleChange}/><br/>
                    <label>Email: </label>
                    <input type = 'text' name = 'email' value = {this.state.email} onChange = {this.handleChange}/><br/>
                    <label>GPA: </label>
                    <input type = 'text' name = 'gpa' value = {this.state.gpa} onChange = {this.handleChange}/><br/>
                    <label>Enroll at: 
                        <select name = 'schoolId' onChange = {this.handleChange}>
                            { this.props.schools.map( school => <option value={school.id}>{school.name}</option> ) }
                        </select>
                    </label>
                    <input type="submit"/>
                    <button type = 'submit'>Create Student</button>
               </form>
    }

}

const mapStateToProps =  state  => ({
    schools: state.data.schools
})


export default connect( mapStateToProps, { createStudent } )( AddStudent )