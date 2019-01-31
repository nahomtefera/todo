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

        // this.getAllProjects = this.getAllProjects.bind(this)
    }

    componentDidMount() {
        let dbprojects = [];

        firebase.database().ref(`users/${this.props.uid}/projects`).on("child_added", snap => {
            let projects = snap.val();
            projects.key = snap.key;

            dbprojects.push(projects)
            this.setState(() => ({fireProjects:dbprojects}))
        });

        firebase.database().ref(`users/${this.props.uid}/projects`).on("child_removed", snap => {
            let projects = snap.val();
            projects.key = snap.key;
            for (let i =0; i<dbprojects.length;i++) {
                if(dbprojects[i].key === projects.key) {
                    dbprojects.splice(i, 1)
                }
            }
            this.setState(() => ({fireProjects:dbprojects}))
        });
    }

    // getAllProjects() {} we might revisit this function at some point

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
                        : <div className="no-content-block">Add a project</div>
                    }
                    
                    <AddProject uid={this.props.uid} changeProject={changeProject}/>
                </div>
            </div>
        )
    }
}