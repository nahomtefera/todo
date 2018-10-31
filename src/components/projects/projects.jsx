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
    }

    componentDidMount() {
        firebase.database().ref(`users/${this.props.uid}/projects`).on("child_added", snap => {
            let projects = snap.val();
            projects.key = snap.key;

            let dbprojects = this.state.fireProjects;
            dbprojects.push(projects)
            this.setState(() => ({fireProjects:dbprojects}))
        });
    }

    render(){
        let currentProject = this.props.currentProject;
        return(
            <div className="projects-container">
                <h2 className="projects-title">Projects</h2>
                <br/>
                {
                    this.state.fireProjects.length > 0
                        ?   <ul className="projects-list">
                                {
                                    this.state.fireProjects.map((project, index)=>{
                                        return (
                                            <li key={index} 
                                                onClick={()=>{this.props.changeProject(project.key)}} 
                                                className={currentProject === project.key ? "project-name active-project" :"project-name"}>{project.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        : "No projects"
                }
                
                <AddProject uid={this.props.uid} />
            </div>
        )
    }
}