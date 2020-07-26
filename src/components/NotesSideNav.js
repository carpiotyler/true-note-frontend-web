import React from 'react';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';
 
function NotesSideNav() {
    const componentStyle = {
        width: '10%',
        paddingLeft: '5px'
    }

    const buttonStyle = {
        color: '#fe5f55',
        cursor: 'pointer'
    }

    const navStyle = {

    }
    
    return (
        <div style= {componentStyle}>
            <div style={buttonStyle}><FontAwesome name='bars' size='2x'/></div>
            <div style={navStyle}></div> 
        </div>
    )
}

export default NotesSideNav