import React, {Component} from 'react';
import AddProject from './addProject'
import './projects.css'
// Firebase
import firebase from 'firebase/app';

export default class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fireProjects: []
        }

        this.getAllProjects = this.getAllProjects.bind(this)
    }

    componentDidMount() {
        this.getAllProjects();

        firebase.database().ref(`users/${this.props.uid}/projects`).on("child_removed", ()=>{
            let updatedProjects = [];
            firebase.database().ref(`users/${this.props.uid}/projects`).once('value').then(snap=>{
                let allProjects = snap.val()

                for (let key in allProjects) {
                    allProjects[key].key = key
                    updatedProjects.push(allProjects[key])
                }

                this.setState({fireProjects: updatedProjects})
            });

        })
    }

    getAllProjects() {
        let dbprojects = [];

        firebase.database().ref(`users/${this.props.uid}/projects`).on("child_added", snap => {
            let projects = snap.val();
            projects.key = snap.key;

            dbprojects.push(projects)
            this.setState(() => ({fireProjects:dbprojects}))
        });
    }

    render(){
        let currentProject = this.props.currentProject;
        let changeProject = this.props.changeProject;
        let showProjects = this.props.showProjects; // For mobile responsiveness
        return(
            <div className={showProjects === true ? "projects-container show-projects-mobile" : "projects-container"}>
                <div className="projects-inner-container">
                    <h2 className="projects-title">Projects</h2>
                    <br/>
                    {
                        this.state.fireProjects.length > 0
                        ?   <ul className="projects-list">
                                <li onClick={()=>{this.props.changeProject('all-projects')}} 
                                    className={currentProject === 'all-projects' ? "project-name active-project" :"project-name"}>All Projects</li>
                                {
                                    this.state.fireProjects.map((project, index)=>{
                                        return (
                                            <li key={index} 
                                                onClick={()=>{changeProject(project.key)}} 
                                                className={currentProject === project.key ? "project-name active-project" :"project-name"}>{project.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        : "No projects"
                    }
                    
                    <AddProject uid={this.props.uid} changeProject={changeProject}/>
                </div>
            </div>
        )
    }
}