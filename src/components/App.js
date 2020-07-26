import React from 'react';
import Home from './Home';
import NotesApp from './NotesApp'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/app" component={NotesApp}></Route>
        <Route path="/" exact component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;