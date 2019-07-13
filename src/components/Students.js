import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../store/actions/postActions';
import AddStudent from './AddStudent';

class Students extends Component {
    
    componentDidMount(){
        this.props.fetchStudents(); 
    }

    componentDidUpdate(prevProps) {
        console.log('prevProps', prevProps);
        console.log('currentProps', this.props);

        if (this.props.students === prevProps.students) {
            console.log('in the componentDidUpdate if statement');
            this.props.fetchStudents(); 
        }
        else{
            console.log('not in if statement');  
        }
      }
    
    render(){
        console.log('props sent to School component', this.props);
        
        return <div>
                    < AddStudent />
                    {this.props.students.map( item => <li key={item.id}>{item.name}</li>)}
               </div>
    }

}

const mapStateToProps = state => ({
    students: state.schools.students
})

const mapDispatchToProps = dispatch => ({
    fetchStudents: () => dispatch(fetchStudents())
})


export default connect( mapStateToProps, mapDispatchToProps)(Students)