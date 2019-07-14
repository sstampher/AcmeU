import React from 'react';
import { connect } from 'react-redux';
import AddStudent from './AddStudent';

function Schools ( props ) {
        
        return <div>
                    < AddStudent />
                    {props.schools.map( item => <li key={item.id}>{item.name}</li>)}
               </div>
    }

const mapStateToProps = state => ({
    schools: state.data.schools
})

export default connect( mapStateToProps )(Schools)
