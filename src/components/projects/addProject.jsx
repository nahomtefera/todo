import React, {Component} from 'react';

export default class AddProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: ""
        }
    }

    render(){
        return(
            <div className="add-project-container">
                <input type="text"/>
                <button>submit</button>
            </div>
        )
    }
}