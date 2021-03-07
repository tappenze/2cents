import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'
import DonationSwitch from '../components/DonationSwitchGlobal'
import bagClub from "../img/bagClubIcon.svg";
import bailProject from "../img/bailProjectIcon.svg";
import feedingAmerica from "../img/feedingAmericaIcon.svg";
import roomToRead from "../img/roomToReadIcon.svg";
import unitedWay from "../img/unitedWayIcon.svg";
import waterOrg from "../img/waterOrgIcon.svg";
import { updateActivity, charityStatus, getAllUsers } from "../connections/userConnections";


class Social extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			allDonations: [],
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
		// console.log("in social");
		// console.log(res.message);
		let users = res.message;
		// for each of these people, get their donations (email is in there)
		await users.forEach(user => this.setState({
			allDonations: this.state.allDonations.concat(user.donationsHistory),
			loaded: true
		}));
		// console.log("after");
		// console.log(this.state.allDonations);
	}

	parseDate = (str) => {
		// console.log(str)
		var mdy = str.split("-");
		return new Date(mdy[0], mdy[1] - 1, parseInt(mdy[2].substring(1,3)));
	  };
	
	  datediff = (first, second) => {
		// Take the difference between the dates and divide by milliseconds per day.
		// Round to nearest whole number to deal with DST.
		return Math.round((second - first) / (1000 * 60 * 60 * 24));
	  };

	render() {
		let mainContent;
		if (this.state.loaded) {

		let donations = this.state.allDonations
		// console.log("donations", donations);

		let donationContent = donations.map((donation) => {
			// console.log(donation)
			// console.log(donation.timeDonated)
			let src
			if (donation.charity === "Boys and Girls Club") {
				src = bagClub
			}
			else if (donation.charity === "Bail Project") {
				src = bailProject
			}
			else if (donation.charity === "Feeding America") {
				src = feedingAmerica
			}
			else if (donation.charity === "Room to Read") {
				src = roomToRead
			}
			else if (donation.charity === "United Way") {
				src = unitedWay
			}
			else if (donation.charity === "Water.org") {
				src = waterOrg
			}
			let donationDate = this.parseDate(donation.timeDonated);
			let diff = this.datediff(donationDate, new Date());
			if (diff < 21) {
			diff += "d";
			} else {
			let monthInt = donationDate.getMonth();
			if (monthInt > 10) {
				diff = "Dec " + donationDate.getDate();
			} else if (monthInt > 9) {
				diff = "Nov " + donationDate.getDate();
			} else if (monthInt > 8) {
				diff = "Oct " + donationDate.getDate();
			} else if (monthInt > 7) {
				diff = "Sep " + donationDate.getDate();
			} else if (monthInt > 6) {
				diff = "Aug " + donationDate.getDate();
			} else if (monthInt > 5) {
				diff = "Jul " + donationDate.getDate();
			} else if (monthInt > 4) {
				diff = "Jun " + donationDate.getDate();
			} else if (monthInt > 3) {
				diff = "May " + donationDate.getDate();
			} else if (monthInt > 2) {
				diff = "Apr " + donationDate.getDate();
			} else if (monthInt > 1) {
				diff = "Mar " + donationDate.getDate();
			} else if (monthInt > 0) {
				diff = "Feb " + donationDate.getDate();
			} else {
				diff = "Jan " + donationDate.getDate();
			}
			}

			let src = unitedWay
			if (donation.charity === 'Boys and Girls Club') src = bagClub;
			else if (donation.charity === 'Bail Project') src = bailProject;
			else if (donation.charity === 'Feeding America') src = feedingAmerica;
			else if (donation.charity === 'Room to Read') src = roomToRead;
			else if (donation.charity === 'Water.org') src = waterOrg;

			return (
			<div>
				<hr />
				<div class="donationRow">
				<div class="donationLeft">
					<img src={src} class="charityIcon" />
					<p>
					<strong>{donation.email}</strong>
					<br/>
					<strong>Donated</strong> to{" "}
					<strong>{donation.charity}</strong>
					<br />
					{diff}
					</p>
				</div>
				<div class="donationRight">
					<p>+ {donation.amount} $</p>
				</div>
				</div>
			</div>
			);
		});
		mainContent = (
			<div>
			<div class="donationCol">{donationContent}</div>
			</div>
		);
		} else {
		mainContent = (
			<div class="donationRowHeader">
			<div class="flex-container">
						<div class="unit">
							<div class="heart">
								<div class="heart-piece-0">
								</div>
								<div class="heart-piece-1">
								</div>
								<div class="heart-piece-2">
								</div>
								<div class="heart-piece-3">
								</div>
								<div class="heart-piece-4">
								</div>
								<div class="heart-piece-5">
								</div>
								<div class="heart-piece-6">
								</div>
								<div class="heart-piece-7">
								</div>
								<div class="heart-piece-8">
								</div>
							</div>
						</div>
					</div>
			</div>
		);
		}
		return(
			<div>
				<Navbar />
				<DonationSwitch />
		      { mainContent }
		  </div>
		)
	}
}

export default Social;