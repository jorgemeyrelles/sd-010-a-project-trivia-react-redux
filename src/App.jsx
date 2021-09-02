import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Questions from './pages/Questions';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/triviagame/" component={ Login } />
      <Route exact path="/triviagame/questions" component={ Questions } />
      <Route exact path="/triviagame/ranking" component={ Ranking } />
      <Route exact path="/triviagame/feedback" component={ Feedback } />
      <Route exact path="/triviagame/settings" component={ Settings } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
