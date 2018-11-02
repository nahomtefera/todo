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
            currentProjectTitle: "All Projects",
            tasks: []
        }

        this.getAllTasks = this.getAllTasks.bind(this);
        this.removeProject = this.removeProject.bind(this);
    }

    componentDidMount() {
        this.getAllTasks();

        firebase.database().ref(`users/${this.props.uid}/projects`).on("child_removed", snap => {
            console.log(snap.val())
        })    
    }

    getAllTasks(project) {
        if(project === undefined || project ===null || project === "all-projects") { // This condition will happen when we are refreshing all task
            let tasks=[]
            firebase.database().ref(`users/${this.props.uid}/projects`).on("child_added", snap => {
                let projects = snap.val();
                if(projects.tasks !== undefined) {
                    let project=projects.tasks;
                    for(var task in project) {
                        if(project[task] !== "") { // this will prevent empty tasks to be shown
                            project[task].key = task// we add the snap key to the task object
                            tasks.unshift(project[task])
                        } 
                    }
                }
                this.setState(()=>({tasks:tasks}))
            })          
        } else { // This will refresh the tasks in the current project
            let tasks=[]

            firebase.database().ref(`users/${this.props.uid}/projects/${project}/tasks`).on("child_added", snap => {
                let task = snap.val();
                
                tasks.unshift(task)
                if(task==="") {tasks=[]} else{
                    task.key=snap.key // add snap key to task object
                }
                this.setState(()=>({tasks:tasks}))
            })    
        }

    }

    componentWillReceiveProps(nextProps) {
        let currentProject=nextProps.currentProject;
        this.getAllTasks(currentProject) // Update all tasks

        // Get the title of the current project
        firebase.database().ref(`users/${this.props.uid}/projects/${currentProject}`).once('value').then(snap=>{
            currentProject !== "all-projects" 
                ? this.setState({currentProjectTitle: snap.val().title})
                : this.setState({currentProjectTitle: "All Projects"})
        })
    }

    removeProject(project) {
        firebase.database().ref(`users/${this.props.uid}/projects/${project}`).remove()
        this.props.changeProject('all-projects')
    }

    render(){
        let currentProject=this.props.currentProject;
        let uid=this.props.uid;
        let tasks=this.state.tasks;
        let removeProject=this.removeProject;

        return(
            <div className="tasks-container">
                <AddTask uid={uid} currentProject={currentProject} />

                <div className='rem-project-container'>
                    {
                      currentProject !== 'all-projects'
                        ? <span onClick={()=>{removeProject(currentProject)}} className="rem-project">Remove Project</span>
                        : <br/>
                    }
                </div>
                <h3 className="tasks-container-title">
                    {this.state.currentProjectTitle}

                </h3>
                {
                    tasks.length > 0 
                        ?   this.state.tasks.map((task, index)=>{
                                return(
                                    <Task refreshTasks={this.getAllTasks} task={task} key={index} uid={uid} currentProject={currentProject}/>
                                )
                            })
                        : "No tasks"
                }
            </div>
        )
    }
}