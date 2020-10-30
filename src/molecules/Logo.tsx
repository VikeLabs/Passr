import React from 'react';
import logo from '../logo.svg';

interface LogoProps {
    height: string
    width: string
  }

function Logo({width, height}:LogoProps) {
    return (
        <img src={logo} style={{width: width, height: height}} alt="logo"/>
    )
}
    
export default Logo