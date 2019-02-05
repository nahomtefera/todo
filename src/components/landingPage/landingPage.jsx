import React from 'react';
// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';



const LandingPage = props => {
  return (
    <div className="landing-page-container">
      <StyledFriebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.firebaseAuth} />
    </div>
  )
}

export default LandingPage; 