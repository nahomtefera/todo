import React, {Component} from 'react';
import './tasks.css';

export default class TasksFilter extends Component {

    render() {
        return (
            <div className="tasks-filter-container">
                <div className="tasks-filter" onClick={()=>{this.props.filter("date")}}>Today</div>
                <div className="tasks-filter" onClick={()=>{this.props.filter("priority")}}>Priority</div>
            </div>
        )
    }
}