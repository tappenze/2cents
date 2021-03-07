import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'

class Donations extends React.Component {
	componentDidMount() {
		if (window.localStorage.hasOwnProperty("jwt") === false) {
			this.props.history.push("/")
		}
	}

	render() {
		return(
			<div>
				<Navbar />
		      <h1>donations</h1>
		    </div>
		)
	}
}

export default Donations;