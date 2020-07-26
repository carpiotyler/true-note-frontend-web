import React from 'react';
import SideNav from './SideNav';
import SearchBar from './Searchbar';
import Profile from './Profile';

function NotesAppToolbar() {
    return (
        <div>
            <SideNav />
            <SearchBar />
            <Profile />
        </div>
    )
}

export default NotesAppToolbar;