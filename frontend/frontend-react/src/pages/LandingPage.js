import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'

class LandingPage extends React.Component {
	render() {
		return(
			<div>
				<Navbar />
		      <h1>landingPage</h1>
		    </div>
		)
	}
}

export default LandingPage;