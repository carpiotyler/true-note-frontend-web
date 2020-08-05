import React from 'react';
import SearchBar from './Searchbar';
import Profile from './Profile';

function NotesAppToolbar() {
    const barStyle= {
        backgroundColor: '#fcfcfc',
        width: '100%',
        height: '5vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '5px',
        paddingBottom: '5px'
    }
    
    return (
        <div style={barStyle}>
            <SearchBar name='Note'/>
            <Profile />
        </div>
    )
}

export default NotesAppToolbar;