import React from 'react';
import logo from '../../images/logo.png'
import './logo.css'

const Logo = props => {
  return (
    <div className='logo-container'>
      <img src={logo} className={props.lp ? "logo_lp" : "logo"} alt="logo"/>
    </div>
  )
}

export default Logo;