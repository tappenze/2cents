import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUser } from "../connections/userConnections";
import axios from "axios";
import jwt_decode from "jwt-decode";

let BASE = "http://localhost:5000";

class Donations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  loaded: false,
      jwt: "",
      accessToken: "",
      transactions: [],
    };
  }

  async componentDidMount() {
    if (window.localStorage.hasOwnProperty("jwt") === false) {
      this.props.history.push("/");
    }
    // just need the access token of the user to be able to call get transactions
    let jwt = window.localStorage.getItem("jwt");
    this.setState({ jwt: jwt });
    // lets get the user access token using this jwt
    // let id = jwt_decode(jwt).id;

    // let res = await fetch(BASE + '/users/id/' + id, {
    // 	method: 'GET',
    // 	headers: {
    // 	  'Content-Type': 'application/json',
    // 	  'Authorization': 'Bearer ' + jwt,
    // 	},
    //   });
    let res = await getUser(jwt);

    console.log("access token is");
    const accessToken = res.message.accessToken;
    this.setState({ accessToken: accessToken });
    // use this to now get transactions
    // console.log(accessToken);
    let result = await axios.get(
      "http://localhost:5000/api/transactions/" + accessToken
    );
    console.log("result from getting the transactions");
    console.log(result);
    console.log(result.data.transactions);
    this.setState({
		transactions: result.data.transactions,
		loaded: true
	})
  }


  render() {
	let mainContent
	if (this.state.loaded) {
		let unfiltered = this.state.transactions.map((transaction) => {
			if (transaction.amount > 0 && (Math.ceil(transaction.amount) !== transaction.amount)) {
				let temp = transaction
				temp.amount = Math.round((Math.ceil(transaction.amount) - transaction.amount) * 100) / 100
				return temp
			}
		})
		console.log(unfiltered)
		let donations = unfiltered.filter(data => data !== undefined)
		console.log(donations)
		let donationContent = donations.map((donation) => {
			return (
				<div>
					
					<div class="donationRow">
						
						<div class="donationLeft">
							
								<h4>
									donated to *insert charity here*<br />payment to {donation.name} on {donation.date}
								</h4>
								
						</div>
						<div class="donationRight">
							<p>
								{donation.amount} {donation.iso_currency_code}
							</p>
						</div>
					
						
					</div>
					
				</div>
			)
		})
		mainContent = (
			<div>
				<div class="donationRowHeader">
					<h1>loaded</h1>
				</div>
				
				<div class="donationCol">
					{ donationContent }
				</div>
				
			</div>
		)
	}
	else {
		mainContent = (
			<div class="donationRowHeader">
				<h1>loaded</h1>
			</div>
		)
	}
	
    return (
      <div>
        <Navbar />
        { mainContent }
      </div>
    );
  }
}

export default Donations;
