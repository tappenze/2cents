import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUser } from '../connections/userConnections';
import {
  getTransactions,
  updateDonations,
  getDonationsFromTransactions,
} from '../connections/makeDonations';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import bagClub from '../img/bagClubIcon.svg';
import bailProject from '../img/bailProjectIcon.svg';
import feedingAmerica from '../img/feedingAmericaIcon.svg';
import roomToRead from '../img/roomToReadIcon.svg';
import unitedWay from '../img/unitedWayIcon.svg';
import waterOrg from '../img/waterOrgIcon.svg';
import DonationSwitch from '../components/DonationSwitchUser';

let BASE = 'http://localhost:5000';

class Donations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      jwt: '',
      accessToken: '',
      transactions: [],
      donations: [],
    };
  }

  async componentDidMount() {
    if (window.localStorage.hasOwnProperty('jwt') === false) {
      this.props.history.push('/');
    }
    // just need the access token of the user to be able to call get transactions
    let jwt = window.localStorage.getItem('jwt');
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

    console.log('access token is');
    const accessToken = res.message.accessToken;
    this.setState({ accessToken: accessToken });
    // use this to now get transactions
    // console.log(accessToken);
    let result = await getTransactions(accessToken);
    // console.log("result from getting the transactions");
    // console.log(result);
    // console.log(result.transactions);
    this.setState({
      transactions: result.transactions,
      loaded: true,
    });
    // create a donations array with fields
    //time donated, charity, and amount
    let donations = await getDonationsFromTransactions(
      res.message,
      result.transactions,
      res.message.activityHistory
    );

    // this function will set the donations for the user given its id?
    // need to parse transactions here
    let updates = await updateDonations(jwt, donations);

    await this.setState({ donations: donations });
    // console.log("donations are")
    // console.log(this.state.donations);
  }

  // getDonationsFromTransactions = (transactions) => {
  //   let donations = transactions.map((transaction) => {
  //     // take the transaction and process it into an object which is {timeDonated, charity, amount}
  //     let amount = Math.round((1 - transaction.amount)*100)/100;
  //     let charity = "unitedMay";  //this is chris's job
  //     let timeDonated = transaction.date;
  //     let temp = {timeDonated: timeDonated, charity: charity, amount: amount};
  //     return temp;
  //   });
  //   return donations;
  // };

  parseDate = (str) => {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
  };

  datediff = (first, second) => {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  };

  render() {
    let mainContent;
    if (this.state.loaded) {
      let donations = this.state.donations;

      let donationContent = donations.map((donation) => {
        // console.log("amount is " + donation.amount)
        let donationDate = this.parseDate(donation.timeDonated);
        let diff = this.datediff(donationDate, new Date());
        if (diff < 21) {
          diff += 'd';
        } else {
          let monthInt = donationDate.getMonth();
          if (monthInt > 10) {
            diff = 'Dec ' + donationDate.getDate();
          } else if (monthInt > 9) {
            diff = 'Nov ' + donationDate.getDate();
          } else if (monthInt > 8) {
            diff = 'Oct ' + donationDate.getDate();
          } else if (monthInt > 7) {
            diff = 'Sep ' + donationDate.getDate();
          } else if (monthInt > 6) {
            diff = 'Aug ' + donationDate.getDate();
          } else if (monthInt > 5) {
            diff = 'Jul ' + donationDate.getDate();
          } else if (monthInt > 4) {
            diff = 'Jun ' + donationDate.getDate();
          } else if (monthInt > 3) {
            diff = 'May ' + donationDate.getDate();
          } else if (monthInt > 2) {
            diff = 'Apr ' + donationDate.getDate();
          } else if (monthInt > 1) {
            diff = 'Mar ' + donationDate.getDate();
          } else if (monthInt > 0) {
            diff = 'Feb ' + donationDate.getDate();
          } else {
            diff = 'Jan ' + donationDate.getDate();
          }
        }

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
		let amount = donation.amount
		if (amount.toString().length < 4) {
			amount += "0"
		}

        return (
          <div>
            <hr />
            <div class='donationRow'>
              <div class='donationLeft'>
                <img src={src} class='charityIcon' />
                <p>
                  <strong>Donated</strong> to{' '}
                  <strong>{donation.charity}</strong>
                  <br />
                  {diff}
                </p>
              </div>
              <div class='donationRight'>
                <p>+ {donation.amount} $</p>
              </div>
            </div>
          </div>
        );
      });
      mainContent = (
        <div>
          <div class='donationCol'>{donationContent}</div>
        </div>
      );
    } else {
      mainContent = (
        <div class='donationRowHeader'>
          <div class='flex-container'>
            <div class='unit'>
              <div class='heart'>
                <div class='heart-piece-0'></div>
                <div class='heart-piece-1'></div>
                <div class='heart-piece-2'></div>
                <div class='heart-piece-3'></div>
                <div class='heart-piece-4'></div>
                <div class='heart-piece-5'></div>
                <div class='heart-piece-6'></div>
                <div class='heart-piece-7'></div>
                <div class='heart-piece-8'></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <DonationSwitch />
        {mainContent}
      </div>
    );
  }
}

export default Donations;
