import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSchools } from '../store/actions/postActions';
import AddStudent from './AddStudent';

class Schools extends Component {
    
    componentDidMount(){
        this.props.fetchSchools(); 
    }
    
    render(){
        console.log('props sent to School component', this.props.schools);
        
        return <div>
                    < AddStudent />
                    {this.props.schools.map( item => <li key={item.id}>{item.name}</li>)}
               </div>
    }

}

const mapStateToProps = state => ({
    schools: state.schools.items
})

const mapDispatchToProps = dispatch => ({
    fetchSchools: () => dispatch(fetchSchools())
})


export default connect( mapStateToProps, mapDispatchToProps)(Schools)
