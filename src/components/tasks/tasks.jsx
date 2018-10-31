import React, {Component} from 'react';
// components
import AddTask from './addTask';
import Task from './task';
import './tasks.css';

export default class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: ["Lorem ipsum dolor sit amet consectetur adipiscing, elit est molestie inceptos consequat, congue mi fusce nisi tellus.", "Lorem ipsum dolor sit amet consectetur, adipiscing elit etiam mauris, imperdiet fames velit in.", "Lorem ipsum dolor sit amet consectetur adipiscing elit, ultrices orci aliquam tincidunt egestas placerat, eros cum dictum facilisis tristique quam.", "Lorem ipsum dolor sit amet consectetur adipiscing elit ante primis praesent porttitor nascetur, tempus egestas hendrerit ultrices molestie sed quis rhoncus justo curae."]
        }
    }

    render(){
        return(
            <div className="tasks-container">
                <AddTask />
                {
                    this.state.tasks.map((task, index)=>{
                        return(
                            <Task task={task} key={index} />
                        )
                    })
                }
            </div>
        )
    }
}