import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'
import DonationSwitch from '../components/DonationSwitchGlobal'
import { updateActivity, charityStatus, getAllUsers } from "../connections/userConnections";


class Social extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			allTransactions: [],
			users: []
		};
	}

	async componentDidMount() {
		let jwt = window.localStorage.getItem("jwt");
		if (window.localStorage.hasOwnProperty("jwt") === false) {
			this.props.history.push("/")
		}
		let result = await charityStatus(window.localStorage.getItem("jwt"))
		if (result.message.charity == "none") {
			this.props.history.push("/charity")
		}
		// get all users first
		let res = await getAllUsers(jwt);
		console.log("in social");
		console.log(res.message);
		let users = res.message;
		// for each of these people, get their donations (email is in there)
		await users.forEach(user => this.setState({allTransactions: this.state.allTransactions.concat(user.donationsHistory)}));
		console.log("after");
		console.log(this.state.allTransactions);
		// i have all transactions now with their emails in them
	}

	render() {
		return(
			<div>
				<Navbar />
				<DonationSwitch />
		      <h1>social</h1>
		  </div>
		)
	}
}

export default Social;