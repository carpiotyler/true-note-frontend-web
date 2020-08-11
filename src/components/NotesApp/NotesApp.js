import React, {Component} from 'react';
import NotesAppToolBar from './NotesAppToolbar';
import NotesArea from './Notes/NotesArea';
import GoalsArea from './Goals/GoalsArea';
import Request from '../utils/Request';
import TrendsArea from './Trends/TrendsArea';
import UserContext from '../utils/UserContext';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

export default class NotesApp extends Component {
    
    style = {
        width: '100%'
    }
    
    constructor() {
        super();
        // parse tokens if present in url or redirect to authenticate if we somehow got here but not through Cognito
        const id_token = window.location.hash.indexOf('id_token') > -1 ? window.location.hash.replace('#', '').split('&').find(str => str.indexOf('id_token') > -1).split('=')[1] : localStorage.getItem('id_token');
        const access_token = window.location.hash.indexOf('access_token') > -1 ? window.location.hash.replace('#', '').split('&').find(str => str.indexOf('access_token') > -1).split('=')[1] : localStorage.getItem('access_token');
        window.location.hash = '';

        if(id_token && access_token) {
            localStorage.setItem('id_token', id_token);
            localStorage.setItem('access_token', access_token);
        }

        this.state = {
            context: {
                id_token: id_token,
                access_token: access_token,
                user_data: {}
            }
        }

        this.request = new Request(id_token, access_token);
    }

    componentDidMount() {
        this.request.get('user-data')
        .then(res => {
            if(res) {
                this.setState(Object.assign({}, this.state, {context: {user_data: res.data}}))
            } else {
                this.request.redirectSignIn()
            }
        });
    }

    render() {
        return (
        <UserContext.Provider value={this.state}>
            <Router>
                <div style={this.style}>
                    <Switch>
                        <Route exact path="/app">
                            <Redirect to="/app/notes" />
                        </Route>
                        <Route exact path="/app/notes">
                            <NotesAppToolBar />
                            <UserContext.Consumer>
                                {
                                    (state) => {
                                        return (
                                            <NotesArea id_token={state.context.id_token} access_token={state.context.access_token}/>
                                        )
                                    }
                                }
                            </UserContext.Consumer>
                        </Route>
                        <Route exact path="/app/goals">
                            <NotesAppToolBar />
                            <UserContext.Consumer>
                                {
                                    (state) => {
                                        return (
                                            <GoalsArea id_token={state.context.id_token} access_token={state.context.access_token}/>
                                        )
                                    }
                                }
                            </UserContext.Consumer>
                        </Route>
                        <Route exact path="/app/trends">
                            <NotesAppToolBar />
                            <TrendsArea />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </UserContext.Provider>
        )    
    }
}