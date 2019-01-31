import React from 'react';
import logo from '../../images/logo.png'
import './logo.css'

const Logo = () => {
  return (
    <div className='logo-container'>
      <img src={logo} className="logo" alt="logo"/>
    </div>
  )
}

export default Logo;