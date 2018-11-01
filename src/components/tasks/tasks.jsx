import React, {Component} from 'react';
// components
import AddTask from './addTask';
import Task from './task';
import './tasks.css';
// Firebase
import firebase from 'firebase/app';

export default class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }

        this.getAllTasks = this.getAllTasks.bind(this)
    }

    componentDidMount() {
        this.getAllTasks();
    }

    getAllTasks() {
        let currentProject=this.props.currentProject;
        let tasks=[]

        if(currentProject===null ){
            firebase.database().ref(`users/${this.props.uid}/projects`).on("child_added", snap => {
                let projects = snap.val();
                if(projects.tasks !== undefined) {
                    let project=projects.tasks;
                    for(var task in project) {
                        if(project[task] !== "") { // this will prevent empty tasks to be shown
                            project[task].key = task// we add the snap key to the task object
                            tasks.push(project[task])
                        } 
                    }
                }
                this.setState(()=>({tasks:tasks}))
            })            
        }
    }

    componentWillReceiveProps(nextProps) {
        let currentProject=nextProps.currentProject;
        let tasks=[]

        firebase.database().ref(`users/${this.props.uid}/projects/${currentProject}/tasks`).on("child_added", snap => {
            let task = snap.val();
            
            tasks.push(task)
            if(task==="") {tasks=[]} else{
                task.key=snap.key // add snap key to task object
            }
            

            this.setState(()=>({tasks:tasks}))
        })    
    }

    render(){
        let currentProject=this.props.currentProject;
        let uid=this.props.uid;
        let tasks=this.state.tasks;

        return(
            <div className="tasks-container">
                <AddTask uid={uid} currentProject={currentProject} />
                {
                    tasks.length > 0 
                        ?   this.state.tasks.map((task, index)=>{
                                return(
                                    <Task task={task} key={index} />
                                )
                            })
                        : "No tasks"
                }
            </div>
        )
    }
}