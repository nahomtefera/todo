import React, {Component} from 'react';

export default class AddTask extends Component {

    render(){
        return(
            <div className="add-task-container">
                <input className="add-task-input" type="text" placeholder="task"/>
                <button className="add-task-btn">Add Task</button>
            </div>
        )
    }
}