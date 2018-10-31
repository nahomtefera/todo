import React, { Component } from 'react';
import './App.css';
// components
import Projects from './components/projects/projects';
import Tasks from './components/tasks/tasks';
import SignOut from './components/signOut/signOut'
// Firebase 
import firebase from 'firebase/app';
import './firebase/';
// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      // Loader
      loading: false,
      // SignedUser
      authUser: null,
      // CurrentProjectId
      selectedProject: null
    }

    // Config for firebaseAuthUi - Authentification
    this.uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (data) => {
          // If the user signing-in is a new user, We will add them to the firebase database
          if(data.additionalUserInfo.isNewUser === true) {
            firebase.database().ref(`users/${data.user.uid}`).set({
              id: data.user.uid, name: data.user.displayName, email:data.user.email,
            });
          }
        },
        signInFailure: function(error) {
          alert(error)
        }
      },
      signInFlow: "popup"
    }
    this.changeProject = this.changeProject.bind(this)
  }

  componentDidMount() {
    // Everytime user signs-in or out
    // We will update the state
    // Set it to null if users signs-out
    // And set it to user if user signs-in
    firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? (
            firebase.database().ref(`users/${authUser.uid}`).once('value').then(snap=>{
              let userInfo = snap.val();
              this.setState(() => ({ authUser: authUser, userInfo: userInfo }))
            })
          )
        : this.setState(() => ({ authUser: null }));
    });
  }

  changeProject(key) {
    this.setState({selectedProject: key})
  }
  
  render() {
    return (
      <div className="App">
        {
          this.state.authUser === null
          ? <StyledFriebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          : <div className="main-app">
              <SignOut signOut={()=>{firebase.auth().signOut()}} />
              <Projects changeProject={this.changeProject} currentProject={this.state.selectedProject} uid={this.state.authUser.uid}/>
              <Tasks />
            </div>
        }
      </div>
    );
  }
}

export default App;
