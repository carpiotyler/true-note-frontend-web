import React from 'react';
import Button from '../Button';

function Toolbar() {
  const style = {
    backgroundColor: '#fcfcfc',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const rightFloatStyle = {
    float: 'right'
  }

  const signIn = function() {
    window.location.href = `https://secure.truenote.app/login?response_type=token&client_id=o3k3uaehm25avnegda3jpqj10&redirect_uri=${window.location.origin}/todos`;
  }

  return (
    <div style={style}>
      <img src='Logo.png' height='100' alt="site logo"></img>
      <div style={rightFloatStyle}>
        <Button text='Sign In' height='40px' onClick={signIn}/>
      </div>
    </div>
  );
}

export default Toolbar;