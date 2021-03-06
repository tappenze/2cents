import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.scss';
import LandingPage from './pages/LandingPage'
import Charity from './pages/Charity'
import NoMatch from './pages/NoMatch'
import Donations from './pages/Donations'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Banks from './pages/BankChoice'


class App extends React.Component {

  render() {
    return (
      <React.Fragment>
          <Router>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/home' component={Home} />
              <Route path='/banks' component={Banks} />
              <Route path='/about' component={About} />
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
