import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'

class Social extends React.Component {
	componentDidMount() {
		if (window.localStorage.getItem("jwt") == 'null') {
			this.props.history.push("/")
		}
	}

	render() {
		return(
			<div>
				<Navbar />
		      <h1>social</h1>
		  </div>
		)
	}
}

export default Social;