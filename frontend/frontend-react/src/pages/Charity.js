import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'

class Charity extends React.Component {
	componentDidMount() {
		console.log("localStorage.get", window.localStorage.getItem("jwt"))
	}

	render() {
		return(
			<div>
				<Navbar />
		      <h1>charity</h1>
		    </div>
		)
	}
}

export default Charity;