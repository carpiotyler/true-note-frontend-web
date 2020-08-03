import React from 'react';
import NotesAppToolBar from './NotesAppToolbar';
import NotesSideNav from './NotesSideNav';
import NotesArea from './NotesArea';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function NotesApp() {
    // parse tokens if present in url or redirect to authenticate if we somehow got here but not through Cognito
    const id_token = window.location.hash.indexOf('id_token') > -1 ? window.location.hash.replace('#', '').split('&').find(str => str.indexOf('id_token') > -1).split('=')[1] : localStorage.getItem('id_token');
    const access_token = window.location.hash.indexOf('access_token') > -1 ? window.location.hash.replace('#', '').split('&').find(str => str.indexOf('access_token') > -1).split('=')[1] : localStorage.getItem('access_token');
    window.location.hash = '';


    if(id_token && access_token) {
        localStorage.setItem('id_token', id_token);
        localStorage.setItem('access_token', access_token);
    }

    const style = {
        display: 'flex',
        width: '100%'
    }

    const rightPane = {
        width: 'calc(100% - 64px)',
        height: '100%'
    }

    return (
        <Router>
            <div style={style}>
                <NotesSideNav />
                <div style={rightPane}>
                    <NotesAppToolBar />
                    <NotesArea id_token={id_token} access_token={access_token}/>
                </div>
            </div>
        </Router>
    )
}

export default NotesApp;