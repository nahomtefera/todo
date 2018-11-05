import React, {Component} from 'react';
import './tasks.css';

export default class TasksFilter extends Component {

    render() {
        return (
            <div className="tasks-filter-container">
                <div className="tasks-filter">Today</div>
                <div className="tasks-filter">Priority</div>
                <div className="tasks-filter">Date</div>
            </div>
        )
    }
}