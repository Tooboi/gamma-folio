import React from 'react';
import logo from '../../assets/bubbleUpLogoV3.png';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="Bubble Up Logo" className="nav-bubble-logo"></img>
    </Link>
  );
}

export default Logo;
