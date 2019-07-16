import React, {Component} from 'react';
import Schools from './Schools';
import Students from './Students';
import EnrolledStudents from './EnrolledStudents';
import Nav from './Nav';
import { HashRouter, Route } from 'react-router-dom';

export default class App extends Component {
    
    render(){
        return ( 
            
            <HashRouter>
                <Route path = '/' component = { Nav } />
                <Route exact path = '/schools' component = { Schools } />
                <Route exact path = '/students' component = { Students } />
                <Route exact path = '/schools/:id' component = { EnrolledStudents } />
            </HashRouter>
        )
    }
}
