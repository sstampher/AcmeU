import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store/actions/actions';

 class UpdateStudent extends Component {

    constructor(props){
        super(props)
        this.state = {
            studentId: this.props.defaultStudentId
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.updateStudent(this.state);
    }

    handleChange(e){
        e.preventDefault();
        this.setState({
            schoolId : e.target.value,
        })
    }

    render(){
        
        return  <form onSubmit={this.handleSubmit}>
                        
                        <select onChange = {this.handleChange}>
                            <option>{this.props.school(this.props.defaultSchoolId)}</option>
                        {this.props.schools.map(
                            school => <option key={school.id} value={school.id}>{school.name}</option>)}
                        </select>
                        <br />
                        <button type = 'submit'>Enroll</button>

               </form>

                
        }

}

const mapStateToProps = state => ({
    students: state.data.students,
    schools: state.data.schools,
    student: state.data.student,
    school: function(schoolId){
        if (schoolId){
            let targetSchool = state.data.schools.find( item => item.id === schoolId );
            let name = targetSchool.name;
            return name;
        }
        return 'Not Enrolled';
    }
})


export default connect( mapStateToProps , { updateStudent } )(UpdateStudent)