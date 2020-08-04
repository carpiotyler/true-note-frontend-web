import React from 'react';
import Toolbar from '../Toolbar'

const pageStyle = {
    backgroundColor: "#fcfcfc",
    display: 'grid',
    justifyContent: 'center'
}

function About() {
    return (
        <div style={pageStyle}>
            <Toolbar />
            <h2 style={{textAlign: 'center'}}>About Us</h2>
        </div>
    )
}

export default About;