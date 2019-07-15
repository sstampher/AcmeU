import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store/actions/actions';

 class UpdateStudent extends Component {

    constructor(props){
        super(props)
        this.state = {
            studentId: '',
            schoolId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        console.log('in the dropdown box submit')
        e.preventDefault();
        console.log('dropdown box state', this.state);
        this.props.updateStudent(this.state);
    }

    handleChange(e){
        e.preventDefault();
        console.log('dropdown box handleSubmit', e.target.name);
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){

        console.log('props sent to select box component', this.props.school(this.props.defaultSchoolId))
        
        return <form>
                    <select>
                        <option value = 'stupid'>{this.props.school(this.props.defaultSchoolId)}</option>
                    </select>


               </form>



        return <form onSubmit = {this.handleSubmit}>
                {this.props.schools.map( item => {
                    <div>
                        <select id={item.id} defaultValue={item.name} onChange={this.handleChange}>
                            <option value = 'stupid'>stupid</option>
                        </select>
                        <button type = 'submit'>Enroll</button>
                    </div>
                } )}  
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