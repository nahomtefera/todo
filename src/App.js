import React, { Component } from 'react';
import './App.css';
import Logo from './components/logo/logo';
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
      currentProject: "all-projects",
      // mobile, show list of projects
      showProjects: false
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
    this.changeProject = this.changeProject.bind(this);
    this.toggleProjects = this.toggleProjects.bind(this);
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
    this.setState({currentProject: key, showProjects:false})
  }

  toggleProjects() {
    let showProjects=this.state.showProjects;
    this.setState({showProjects: !showProjects})
  }
  
  render() {
    let currentProject=this.state.currentProject, changeProject=this.changeProject, showProjects=this.state.showProjects;
    
    return (
      <div className="App">
        {
          this.state.authUser === null
          // Show login page if user is not logged in 
          ? <StyledFriebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          // Show projects page when user is logged 
          : <div>
              {/* Menu SVG will only show for mobile devices */}
              <div className="show-projects-menu-container"><svg onClick={this.toggleProjects} className="show-projects-menu" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg></div>              
              {/* Main components for home page */}             
              <div className="main-app">
                <Logo />
                <SignOut signOut={()=>{firebase.auth().signOut()}} />
                <Projects showProjects={showProjects} changeProject={changeProject} currentProject={currentProject} uid={this.state.authUser.uid}/>
                <Tasks changeProject={changeProject} currentProject={currentProject} uid={this.state.authUser.uid}/>
              </div>
            </div> 
        }
      </div>
    );
  }
}

export default App;
