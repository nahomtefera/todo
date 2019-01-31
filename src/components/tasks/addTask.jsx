import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
// Firebase
import firebase from 'firebase/app';


export default class AddTask extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
          startDate: moment(),
          date: null,
          priority: null,
          dateSet: false,
          task: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.togglePriority = this.togglePriority.bind(this);
        this.setPriority = this.setPriority.bind(this);
        this.addTask = this.addTask.bind(this)
        this.taskChange = this.taskChange.bind(this)
    }
     
    handleChange(date) {
        this.setState({
            startDate: date,
            date: date.format("ddd, MMM Do YYYY"),
            dateSet: true
        }, ()=>{this.toggleCalendar()})
    }

    toggleCalendar (e) {
        e && e.preventDefault()
        this.setState({isOpen: !this.state.isOpen})
    }

    togglePriority (e) {
        e && e.preventDefault()
        this.setState({isPriorityOpen: !this.state.isPriorityOpen})
    }
      
    setPriority(level) {
        this.setState({priority: level}, ()=>{this.togglePriority()})
    }

    taskChange(e) {
        let task=e.target.value;
        this.setState({task:task})
    }

    addTask() {
        let uid=this.props.uid;
        let currentProject=this.props.currentProject;
        let task=this.state.task;
        let date=this.state.date;
        let priority=this.state.priority;

        if(task=="" || date===null || priority===null || currentProject===null || currentProject==='all-projects') {return console.log('there are empty fields')}
        // we reference the task obj inside the current project
        firebase.database().ref(`users/${uid}/projects/${currentProject}/tasks`).push().set({
            task: task,
            date: date,
            completed: false,
            projectKey: currentProject,
            priority: priority,
        })
    }

    render(){
        let task=this.state.task;
        let taskChange=this.taskChange
        return(
            <div className="add-task-container">
                {/* Date and Priority container */}
                <div className="date-priority-container">
                    {/* Date Selector */}
                    <div className="date-picker-container">
                        {/* Calendar icon */}
                        <svg className={this.state.dateSet === false ? "calendar-icon" : "calendar-icon calendar-set"} onClick={this.toggleCalendar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"/></svg>
                        {   /* If isOpen equals true we will show the calendar*/
                            this.state.isOpen && (
                                <DatePicker selected={this.state.startDate} onChange={this.handleChange} withPortal inline />
                            )
                        }
                    </div>

                    {/* Priority Selector */}
                    <svg className={this.state.priority === null ? "priority-icon-main" : "priority-icon-main " + this.state.priority} onClick={this.togglePriority} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M27.483,13.752L16.248,2.517c-0.689-0.689-1.807-0.689-2.497,0L2.517,13.752c-0.689,0.689-0.689,1.807,0,2.497  l11.235,11.235c0.689,0.689,1.807,0.689,2.497,0l11.235-11.235C28.172,15.559,28.172,14.441,27.483,13.752z M16.212,8l-0.2,9h-2.024  l-0.2-9H16.212z M15.003,22.189c-0.828,0-1.323-0.441-1.323-1.182c0-0.755,0.494-1.196,1.323-1.196c0.822,0,1.316,0.441,1.316,1.196  C16.319,21.748,15.825,22.189,15.003,22.189z"/></svg>
                    <div className={this.state.isPriorityOpen === true ? "priority-levels-show" :"priority-levels"}>
                        <svg className="priority-icon low-priority" onClick={()=>{this.setPriority("low")}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M27.483,13.752L16.248,2.517c-0.689-0.689-1.807-0.689-2.497,0L2.517,13.752c-0.689,0.689-0.689,1.807,0,2.497  l11.235,11.235c0.689,0.689,1.807,0.689,2.497,0l11.235-11.235C28.172,15.559,28.172,14.441,27.483,13.752z M16.212,8l-0.2,9h-2.024  l-0.2-9H16.212z M15.003,22.189c-0.828,0-1.323-0.441-1.323-1.182c0-0.755,0.494-1.196,1.323-1.196c0.822,0,1.316,0.441,1.316,1.196  C16.319,21.748,15.825,22.189,15.003,22.189z"/></svg>
                        <svg className="priority-icon mid-priority" onClick={()=>{this.setPriority("med")}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M27.483,13.752L16.248,2.517c-0.689-0.689-1.807-0.689-2.497,0L2.517,13.752c-0.689,0.689-0.689,1.807,0,2.497  l11.235,11.235c0.689,0.689,1.807,0.689,2.497,0l11.235-11.235C28.172,15.559,28.172,14.441,27.483,13.752z M16.212,8l-0.2,9h-2.024  l-0.2-9H16.212z M15.003,22.189c-0.828,0-1.323-0.441-1.323-1.182c0-0.755,0.494-1.196,1.323-1.196c0.822,0,1.316,0.441,1.316,1.196  C16.319,21.748,15.825,22.189,15.003,22.189z"/></svg>
                        <svg className="priority-icon high-priority" onClick={()=>{this.setPriority("high")}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M27.483,13.752L16.248,2.517c-0.689-0.689-1.807-0.689-2.497,0L2.517,13.752c-0.689,0.689-0.689,1.807,0,2.497  l11.235,11.235c0.689,0.689,1.807,0.689,2.497,0l11.235-11.235C28.172,15.559,28.172,14.441,27.483,13.752z M16.212,8l-0.2,9h-2.024  l-0.2-9H16.212z M15.003,22.189c-0.828,0-1.323-0.441-1.323-1.182c0-0.755,0.494-1.196,1.323-1.196c0.822,0,1.316,0.441,1.316,1.196  C16.319,21.748,15.825,22.189,15.003,22.189z"/></svg>
                    </div>
                    <br/><br/>
                </div>
                {/* Text Input and Submit btn */}
                <div className="add-task-input-container">
                    <input className="add-task-input" value={task} onChange={taskChange} type="text" placeholder="New task..."/>
                    {/* <svg onClick={this.addTask} className="send-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 0l20 10L0 20V0zm0 8v4l10-2L0 8z"/></svg> */}
                    <button onClick={this.addTask}  className="add-task-btn">+</button>
                </div>
            </div>
        )
    }
}