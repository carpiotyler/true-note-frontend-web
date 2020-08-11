import React from 'react';
import NotesSideNav from './NotesSideNav';
import SearchBar from './Searchbar';
import Profile from './Profile';

function NotesAppToolbar() {
    const barStyle= {
        backgroundColor: '#fcfcfc',
        width: '100%',
        minHeight: '44px',
        height: '5vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '5px',
        paddingBottom: '5px'
    }
    
    return (
        <div style={barStyle}>
            <NotesSideNav />
            <SearchBar name='Note'/>
            <Profile />
        </div>
    )
}

export default NotesAppToolbar;