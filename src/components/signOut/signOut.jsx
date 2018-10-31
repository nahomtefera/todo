import React, {Component} from 'react';

export default class SignOut extends Component {
    render(){
        return(
            <span className="sign-out-button">
                <svg onClick={this.props.signOut} className="sign-out-icon" height="32px" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M15,30H2V2h13c0.552,0,1-0.448,1-1s-0.448-1-1-1H1C0.448,0,0,0.448,0,1v30c0,0.552,0.448,1,1,1h14   c0.552,0,1-0.448,1-1S15.552,30,15,30z"/><path d="M31.71,15.302l-6.9-6.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l5.2,5.275   H8.003c-0.552,0-1,0.452-1,1.01c0,0.558,0.448,1.01,1,1.01h20.593l-5.2,5.275c-0.391,0.395-0.391,1.034,0,1.428   c0.391,0.395,1.024,0.395,1.414,0l6.899-6.999C32.095,16.341,32.099,15.69,31.71,15.302z"/></svg>              
            </span>
        )
    }
}