import React, {Component} from 'react';
// components
import AddTask from './addTask';
import './tasks.css'

export default class Tasks extends Component {

    render(){
        return(
            <div className="tasks-container">
                <AddTask />
                <br/><br/><br/>
                Tasks 
            </div>
        )
    }
}