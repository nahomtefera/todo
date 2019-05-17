import React from 'react';
import logo from '../../images/logo.png'
import logo2 from '../../images/favicon.png';
import './logo.css'

const Logo = props => {
  return (
    <div className='logo-container'>
      <img src={logo} className={props.lp ? "logo_lp" : "hide-logo"} alt="logo"/>
      <img src={logo2} className={props.lp ? "hide-logo" : "logo"} alt="logo"/>
    </div>
  )
}

export default Logo;