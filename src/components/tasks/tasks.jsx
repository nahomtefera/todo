import React, {Component} from 'react';
// components
import AddTask from './addTask';
import Task from './task';
import TasksFilter from './tasksFilter';
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
        this.filter = this.filter.bind(this)
    }

    componentDidMount() {
        this.getAllTasks();
    }

    getAllTasks(project) {
        if(project === undefined || project ===null || project === "all-projects") { // This condition will happen when we are refreshing all task
            let tasks=[]
            firebase.database().ref(`users/${this.props.uid}/projects`).once("value", snap => {
                let projects = snap.val()
                // If we want to get all tasks we will use the once("value") method
                // We will get a snap of all the projects as an object
                // We will iterate through the projects object
                // Check if each project has tasks
                // If the project has tasks, we will iterate through those tasks
                // And add to the tasks var every task that is not empty
                for (let key in projects) {
                    let project = projects[key]
                    if(project.tasks !== undefined) {
                        let projectTasks = project.tasks
                        for (let key in projectTasks) {
                            let task = projectTasks[key]
                            if(task != "") {
                                task.key = key;
                                tasks.unshift(task)
                            }
                        }
                    }
                }
                this.setState(()=>({tasks:tasks}))
            });      
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

    filter(type) {
        console.log(type)
        // function will be located in Tasks component
        // _tasks will be an array equal to component props tasks
        // _we will start by looping through each element in the array {
        //     _if type equals date {
        //         _we will order the array by earliest date
        //         _each item in the array has a property "dateUnix" that will be used to determine which tasks is due earlier
        //         _check how to order array of objects, by object parameter
        //     }
        //     _if type equals priority {
        //         _we will order the array by highest priority
        //         _each item in the array has a property "priority" that goes from 1-3, we will order the array in descending order
        //         _check how to order array of objects, by object parameter
        //     }
        // }
        // _update state to assign the new ordered tasks to state.tasks

    }

    render(){
        let currentProject=this.props.currentProject;
        let uid=this.props.uid;
        let tasks=this.state.tasks;
        let removeProject=this.removeProject;

        return(
            <div className="tasks-container">
                
                <h3 className="tasks-container-title">
                    {this.state.currentProjectTitle}
                </h3>
                
                {/* <TasksFilter filter={this.filter}/> */}

                {currentProject === 'all-projects' ? "" : <AddTask uid={uid} currentProject={currentProject} /> }

                {
                    tasks.length > 0 
                        ?   this.state.tasks.map((task, index)=>{
                                return(
                                    <Task getAllTasks={this.getAllTasks} task={task} key={index} uid={uid} currentProject={currentProject}/>
                                )
                            })
                        : <div className="no-content-block">You don't have any tasks yet</div>
                }

                {
                    currentProject !== 'all-projects'
                    ? <div className='rem-project-container'> 
                        <span onClick={()=>{removeProject(currentProject)}} className="rem-project">Remove Project</span>
                        </div>
                    : <br/>
                }

            </div>
        )
    }
}