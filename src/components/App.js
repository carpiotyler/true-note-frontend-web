import React from 'react';
import About from './About';
import Home from './Home';
import NotesApp from './NotesApp'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/app" component={NotesApp}></Route>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;