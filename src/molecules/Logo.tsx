import React from 'react';
import logo from './logo.svg';

interface LogoProps {
    height: string
    width: string
  }

function Logo({width, height}:LogoProps) {
    return (
        <img src={require('../logo.svg')} style={{width: width, height: height}}/>
    )
}
    
export default Logo