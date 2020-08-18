import React from 'react';
import Home from './Landing/Home';
import NotesApp from './NotesApp/NotesApp'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/" component={NotesApp}></Route>
      </Switch>
    </Router>
  );
}

export default App;