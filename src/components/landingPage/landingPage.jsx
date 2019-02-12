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

let pattern = Trianglify({ height: 1800, width: window.innerWidth, cell_size: 150, x_colors: ['#fe4a49', '#ffe500', '#5b00ff'], variance: .4, seed: 'todoendo'}).png();


const LandingPage = props => {
  return (
    <div className="lp_outer_container"  style={{background: `url(${pattern})`}}>
      <div className="landing_page_container">
        
        <Logo lp={true} />
        <div className="lp_info_container">
          <h1 className="lp_info_header">Make your life easier with a simple todo list application.</h1>
          <p className="lp_info_text">
            <b style={{color: "#aa32e3"}}>Todoendo</b> - a powerful <b>todo</b> app, to help you deal with complex aspects of life in a visually appealing and intuitive interface.
          </p>
          <div className="lp_cta">
          <StyledFriebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.firebaseAuth} />
          </div>
        </div>

        <div className="lp_illustration_container">
          <img className="lp_illustration" src={require('../../images/lp_illustration_2.svg')} alt=""/>
        </div>  

        <div className="lp_footer">
          <b>2019 &copy; todoendo</b>. All rights reserved.
        </div>  
      </div>
    </div>
  )
}

export default LandingPage; 