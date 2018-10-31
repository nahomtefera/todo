import React, {Component} from 'react';
// components

export default class Task extends Component {
    render(){
        return(
            <div className="task-container">
                <h2 className="task-title">{this.props.task}</h2>
            </div>
        )
    }
}