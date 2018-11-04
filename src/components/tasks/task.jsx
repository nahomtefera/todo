import React, {Component} from 'react';
// Firebase
import firebase from 'firebase/app';


export default class Task extends Component {

    constructor(props) {
        super(props)

        this.removeTask = this.removeTask.bind(this);
        this.toggleCompleteTask = this.toggleCompleteTask.bind(this);
    }

    removeTask(taskKey, projectKey) {
        let task=this.props.task;
        let currentProject= this.props.currentProject;
        console.log(currentProject)
        firebase.database().ref(`users/${this.props.uid}/projects/${projectKey}/tasks/${taskKey}`).remove().then(()=>{
            this.props.refreshTasks(currentProject)
        })
    }

    toggleCompleteTask(status) {
        let taskId=this.props.task.key;
        let currentProject= this.props.task.projectKey;

        let update = {};
        update["completed"] = !status;

        firebase.database().ref(`users/${this.props.uid}/projects/${currentProject}/tasks/${taskId}`).update(update)
        this.props.refreshTasks(this.props.currentProject)
    }

    render(){
        let task=this.props.task;
        let completed=task.completed;
        let priority=task.priority;
        let toggleCompleteTask=this.toggleCompleteTask;

        return(
            <div className={
                completed === true ? "task-container task-completed" :
                priority === null ? "task-container" : `task-container task-${priority}-priority`}>

                {/* Icon to check completed task */}
                <div className="task-icons">
                    <svg onClick={()=>{toggleCompleteTask(task.completed)}} className={completed ===true ? "svg-icons check-svg-completed" : "svg-icons check-svg"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"/></svg>
                </div>
                {/* Actual task text */}
                <h2 className="task-title">
                    {task.task}
                    <br/>
                    {/* Calendar icon and due date */}
                    <div className="task-date-container">
                        <svg className="task-title-calendar-icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"/>
                        </svg>
                        <span className="task-container-date">{task.date}</span>
                    </div>
                </h2>
                {/* Trash icon to remove task */}
                <div className="task-icons">
                    <svg className="svg-icons trash-svg" onClick={()=>{this.removeTask(task.key, task.projectKey)}}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/>
                    </svg>
                </div>
            </div>
        )
    }
}