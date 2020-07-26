import React from 'react';
import NotesAppToolBar from './NotesAppToolbar';
import NotesArea from './NotesArea';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function NotesApp() {
    // parse tokens if present in url or redirect to authenticate if we somehow got here but no through Cognito
    const id_token = window.location.hash.indexOf('id_token') > -1 ? window.location.hash.replace('#', '').split('&').find(str => str.indexOf('id_token') > -1).split('=')[1] : window.location.href = `https://true-note.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=o3k3uaehm25avnegda3jpqj10&redirect_uri=${window.location.origin}/app`;
    const access_token = window.location.hash.indexOf('id_token') > -1 ? window.location.hash.replace('#', '').split('&').find(str => str.indexOf('access_token') > -1).split('=')[1] : window.location.href = `https://true-note.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=o3k3uaehm25avnegda3jpqj10&redirect_uri=${window.location.origin}/app`;
    
    return (
        <Router>
            <div>
                <NotesAppToolBar />
                <NotesArea id_token={id_token} access_token={access_token}/>
            </div>
        </Router>
    )
}

export default NotesApp;