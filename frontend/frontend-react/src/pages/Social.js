import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'
import { updateActivity, charityStatus } from "../connections/userConnections";


class Social extends React.Component {
	async componentDidMount() {
		if (window.localStorage.hasOwnProperty("jwt") === false) {
			this.props.history.push("/")
		}
		let result = await charityStatus(window.localStorage.getItem("jwt"))
		if (result.message.charity == "none") {
			this.props.history.push("/charity")
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