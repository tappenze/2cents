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
		if (window.localStorage.getItem("jwt") == 'null') {
			this.props.history.push("/")
		}
	}

	render() {
		return(
			<div>
				<Navbar />
				
		  </div>
		)
	}
}

export default Charity;