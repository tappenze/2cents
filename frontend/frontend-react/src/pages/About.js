import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'

class About extends React.Component {
	render() {
		return(
			<div>
				<Navbar />
		      <h1>about</h1>
		  </div>
		)
	}
}

export default About;