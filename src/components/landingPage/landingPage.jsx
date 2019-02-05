import React from 'react';
import './landingPage.css'
// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// Trianglify 
import Trianglify from 'trianglify';

let canvas = document.getElementById("canvasnode");
var colorFunc = function(x, y) {
	return 'hsl('+Math.floor(Math.abs(x*y)*360)+',80%,60%)';
};

let pattern = Trianglify({ height: window.innerHeight, width: window.innerWidth, cell_size: 305, x_colors: ['#65e9ee', '#26bbf7', '#00d8e4'], variance: .4, seed: 'todoendo'}).png();


const LandingPage = props => {
  return (
    <div className="landing_page_container" style={{background: `url(${pattern})`}}>
      {/* <StyledFriebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.firebaseAuth} /> */}
      {/* <div id="canvasnode" style={{position:"absolute", top:0, left:0, width:`${window.innerWidth}px`, height:`${window.innerHeight}px`,  }}/> */}

      <img className="lp_illustration" src={require('../../images/lp_illustration.svg')} alt=""/>

      <br/><br/><br/><br/>
    
    </div>
  )
}

export default LandingPage; 