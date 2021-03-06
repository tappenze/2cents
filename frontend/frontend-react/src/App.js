import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage'
import Charity from './pages/Charity'
import NoMatch from './pages/NoMatch'
import Donations from './pages/Donations'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Navbar from './components/Navbar'

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
          <Router>
            <Switch>
              <Route
                exact path='/'
                render= {
                  () => {
                    return(
                      <LandingPage />
                    )
                  }
                }
              />
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
