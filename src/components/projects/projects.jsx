import React, {Component} from 'react';
import AddProject from './addProject'
import './projects.css'

export default class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: ['All Projects', 'GAP', 'Home', 'bravoresume', 'jaminthebay']
        }
    }

    render(){
        return(
            <div className="projects-container">
                <h2 className="projects-title">Projects</h2>
                <br/>
                <ul className="projects-list">
                    {
                        this.state.projects.map((project, index)=>{
                            return (
                                <li key={index} className="project-name">{project}</li>
                            )
                        })
                    }
                </ul>
                <AddProject />
            </div>
        )
    }
}