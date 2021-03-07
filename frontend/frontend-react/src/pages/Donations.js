import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUser } from "../connections/userConnections";
import { getTransactions, updateDonations, getDonationsFromTransactions } from "../connections/makeDonations";
import axios from "axios";
import jwt_decode from "jwt-decode";
import bagClub from "../img/bagClubIcon.svg";
import bailProject from "../img/bailProjectIcon.svg";
import feedingAmerica from "../img/feedingAmericaIcon.svg";
import roomToRead from "../img/roomToReadIcon.svg";
import unitedWay from "../img/unitedWayIcon.svg";
import waterOrg from "../img/waterOrgIcon.svg";
import DonationSwitch from "../components/DonationSwitchUser";

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
    let donations = await getDonationsFromTransactions(res.message, result.transactions, res.message.activityHistory);
    console.log("donations are")
    console.log(donations)
    // this function will set the donations for the user given its id?
    // need to parse transactions here
    let updates = await updateDonations(jwt, donations);
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
    var mdy = str.split("-");
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
      let unfiltered = this.state.transactions.map((transaction) => {
        if (
          transaction.amount > 0 &&
          Math.ceil(transaction.amount) !== transaction.amount
        ) {
          let temp = transaction;
          temp.amount = (
            Math.round(
              (Math.ceil(transaction.amount) - transaction.amount) * 100
            ) / 100
          ).toString();
          if (temp.amount.length < 4) {
            temp.amount += "0";
          }
          temp.charity = "unitedWay";
          return temp;
        }
      });
      console.log(unfiltered);
      let donations = unfiltered.filter((data) => data !== undefined);
      console.log(donations);

      let donationContent = donations.map((donation) => {
        let iconSrc = donation.charity;
        let donationDate = this.parseDate(donation.date);
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

        return (
          <div>
            <hr />
            <div class="donationRow">
              <div class="donationLeft">
                <img src={unitedWay} class="charityIcon" />
                <p>
                  <strong>Donated</strong> to{" "}
                  <strong>*insert charity here*</strong>
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
          <h1>loaded</h1>
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
