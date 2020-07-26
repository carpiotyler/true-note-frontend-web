import React from 'react';
import Toolbar from './Toolbar';

const pageStyle = {
    backgroundColor: "#fcfcfc",
    display: 'grid',
    justifyContent: 'center'
}

const headingStyle = {
    marginBottom: '5px',
    marginTop: '5px',
    textAlign: 'center',
    color: '#141115'
}

function Home() {
    return (
        <div>
            <Toolbar />
            <div style={pageStyle}>
                <h2 style={headingStyle}>Modern Note-Taking, Checklists, and Goals Tracking.</h2>
                <h3 style={headingStyle}>Track what matters most on all of your devices</h3>
            </div>
        </div>
    )
}

export default Home;