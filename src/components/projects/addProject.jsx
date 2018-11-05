import React, {Component} from 'react';
// Firebase
import firebase from 'firebase/app';

export default class AddProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: ""
        }
        this.db = firebase.database().ref(`users/${this.props.uid}/`).child("projects");

        this.handleChange = this.handleChange.bind(this)
        this.addProject = this.addProject.bind(this)
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({projectName: value})
    }

    addProject() {
        console.log(this.state.projectName)
        this.db.push().set({
            id: Date.now(),
            title: this.state.projectName,
            tasks:[""]
        })
        this.props.changeProject('all-projects')
        this.setState({projectName:""})
    }

    render(){
        return(
            <div className="add-project-container">
                <input type="text" className="add-project-input" placeholder="New List..." value={this.state.projectName} onChange={this.handleChange}/>
                <br/>
                <button className="add-project-btn" onClick={this.addProject}>+</button>
            </div>
        )
    }
}