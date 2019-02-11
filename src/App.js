import React, { Component } from 'react';
import './App.css';
import Logo from './components/logo/logo';
// components
import LandingPage from './components/landingPage/landingPage'
import Projects from './components/projects/projects';
import Tasks from './components/tasks/tasks';
import SignOut from './components/signOut/signOut'
// Firebase 
import firebase from 'firebase/app';
import './firebase/';


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
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID
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
          ? <LandingPage uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} > </LandingPage>
          // Show projects page when user is logged 
          : <div>
              {/* Menu SVG will only show for mobile devices */}
              <div className="show-projects-menu-container"><svg onClick={this.toggleProjects} className="show-projects-menu" height="40px" version="1.1" viewBox="2 5 26 26" width="40px" xmlns="http://www.w3.org/2000/svg" ><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill={this.state.showProjects? "#369fe6" : "#797979"} id="icon-53-notebook-list"><path d="M21,4 L18,4 L18,3 L17,3 L17,4 L14,4 L14,3 L13,3 L13,4 L13,4 L10,4 L10,3 L9,3 L9,4 L7.99742191,4 C6.89427625,4 6,4.88976324 6,6.00359486 L6,26.9964051 C6,28.10296 6.89092539,29 7.99742191,29 L23.0025781,29 C24.1057238,29 25,28.1102368 25,26.9964051 L25,6.00359486 C25,4.89703997 24.1090746,4 23.0025781,4 L22,4 L22,3 L21,3 L21,4 L21,4 Z M21,5 L18,5 L18,6 L17,6 L17,5 L14,5 L14,6 L13,6 L13,5 L10,5 L10,6 L9,6 L9,5 L7.9999602,5 C7.44769743,5 7,5.43891776 7,6.00307055 L7,26.9969294 C7,27.55091 7.45470893,28 7.9999602,28 L23.0000398,28 C23.5523026,28 24,27.5610822 24,26.9969294 L24,6.00307055 C24,5.44908998 23.5452911,5 23.0000398,5 L22,5 L22,6 L21,6 L21,5 L21,5 Z M14,12 L14,13 L22,13 L22,12 L14,12 L14,12 Z M9,11 L9,14 L12,14 L12,11 L9,11 L9,11 Z M10,12 L10,13 L11,13 L11,12 L10,12 L10,12 Z M9,16 L9,19 L12,19 L12,16 L9,16 L9,16 Z M10,17 L10,18 L11,18 L11,17 L10,17 L10,17 Z M14,17 L14,18 L22,18 L22,17 L14,17 L14,17 Z M9,21 L9,24 L12,24 L12,21 L9,21 L9,21 Z M10,22 L10,23 L11,23 L11,22 L10,22 L10,22 Z M14,22 L14,23 L22,23 L22,22 L14,22 L14,22 Z" id="notebook-list"/></g></g></svg></div>              
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
