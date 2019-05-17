import React, {Component} from 'react';
// Firebase
import firebase from 'firebase/app';

export default class AddProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            nameError: false
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
        if (this.state.projectName == '') {
            this.setState({nameError: true})
        } else {
            const ref = this.db.push();
            ref.set({
                id: Date.now(),
                title: this.state.projectName,
                tasks:[""]
            })

            // We want to get the key right away 
            // To be able to go the tasks page for that list
            let newListKey=ref.key;
            this.props.changeProject(newListKey)
            this.setState({projectName:"", nameError: false})
        }
    }

    render(){
        let nameError = this.state.nameError;

        return(
            <div className="add-project-container">
                <input type="text" className={nameError ? "add-project-input add-project-input-error" : "add-project-input"} placeholder="New List..." value={this.state.projectName} onChange={this.handleChange}/>
                <br/>
                <button className="add-project-btn" onClick={this.addProject}>+</button>
            </div>
        )
    }
}