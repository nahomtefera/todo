import React from 'react';
import './landingPage.css'
// Components
import Logo from '../logo/logo';
// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// Trianglify 
import Trianglify from 'trianglify';

let canvas = document.getElementById("canvasnode");
var colorFunc = function(x, y) {
	return 'hsl('+Math.floor(Math.abs(x*y)*360)+',80%,60%)';
};

let pattern = Trianglify({ height: window.innerHeight, width: window.innerWidth, cell_size: 250, x_colors: ['#fe4a49', '#fed766', '#2ab7ca'], variance: .4, seed: 'todoendo'}).png();


const LandingPage = props => {
  return (
    <div className="landing_page_container" style={{background: `url(${pattern})`}}>
      
      <Logo lp={true} />
      <div className="lp_info_container">
        <h1 className="lp_info_header">Never worry about forgeting things again</h1>
        <p className="lp_info_text">Lorem ipsum dolor sit amet consectetur adipiscing elit nascetur magnis tristique, eu primis eros habitant eleifend fusce faucibus torquent egestas, fringilla praesent hac cras placerat dis massa velit congue.</p>
        <div className="lp_cta">
        <StyledFriebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.firebaseAuth} />
        </div>
      </div>

      <div className="lp_illustration_container">
        <img className="lp_illustration" src={require('../../images/lp_illustration.svg')} alt=""/>
      </div>    
    </div>
  )
}

export default LandingPage; 