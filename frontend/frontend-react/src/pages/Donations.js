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
    this.setState({ transactions: result.data.transactions})
  }


  render() {
    return (
      <div>
        <Navbar />
        <h1>donations</h1>
      </div>
    );
  }
}

export default Donations;
