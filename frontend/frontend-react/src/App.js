import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.scss';
import LandingPage from './pages/LandingPage'
import Charity from './pages/Charity'
import NoMatch from './pages/NoMatch'
import Donations from './pages/Donations'
import Social from './pages/Social'
import SignIn from './pages/SignIn'
import Home from './pages/Home'


class App extends React.Component {

  render() {
    return (
      <React.Fragment>
          <Router>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/home' component={Home} />
              <Route path='/social' component={Social} />
              <Route path='/charity' component={Charity} />
              <Route path='/donations' component={Donations} />
              <Route path='/signin' component={SignIn} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
      </React.Fragment>
    );
  }
  
}

export default App;
