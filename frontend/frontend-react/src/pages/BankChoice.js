import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import { usePlaidLink } from "react-plaid-link";
import { PlaidLink } from "./PlaidLink";
import axios from "axios";
import jwt_decode from "jwt-decode";
import plaidIcon from '../img/plaidIcon.svg'
import Topbar from '../components/Topbar'
// import Link from './Link';

let BASE = 'http://localhost:5000';

class BankChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      jwt: "",
      linkToken: "",
      accessToken: "",
      itemID: "",
    };
  }
  componentDidMount() {
    console.log("mounted");
    this.setState({ jwt: window.localStorage.getItem("jwt") })
    console.log("banks jwt", window.localStorage.getItem("jwt"));
    this.createLinkToken();
    console.log("post createLinkToken");
  }

  //   handlePasswordChange = (event) => {
  //     this.setState({
  //       password: event.target.value,
  //     });
  //   };

  //   handleUserNameChange = (event) => {
  //     this.setState({
  //       username: event.target.value,
  //     });
  //   };
  createLinkToken = async () => {
    const res = await axios.post("http://localhost:5000/api/create_link_token");
    console.log("and res is");
    console.log(res);
    const data = res.data.link_token;
    this.setState({ linkToken: data });
  };

  // pass the link token to this function
  getAccessToken = async (publicToken) => {
    console.log("client side public token", publicToken);
    //sends the public token to the app server
    const res = await axios.post("http://localhost:5000/api/get_access_token", {
      publicToken: publicToken,
    });
    console.log("return from get access token with public toke  is");
    console.log(res);
    const data = res.data;
    //updates state with permanent access token
    this.setState({ accessToken: data.access_token });
    this.setState({ itemID: data.item_id });
    // now update the user's information

    console.log("the jwt in bankchoice is ")
    console.log(this.state.jwt)
    let id = jwt_decode(this.state.jwt).id;
    let info= {accessToken: data.access_token, itemID: data.item_id, id: id};
    console.log("about to make call with info being:")
    console.log(info)
    let result = await fetch(BASE + '/users/bank-choice', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.jwt,
      },
      body: JSON.stringify(info),
    });
    console.log(result)
  };

  handleSubmit = async (event) => {
    // just make the call to the backend here and console log it
  };

  getLinkToken = () => {
    console.log("getting link token for our little button");
    console.log(this.state.linkToken);
    return this.state.linkToken;
  };

  render() {
    const onExit = (error, metadata) => console.log("onExit", error, metadata);

    const onEvent = (eventName, metadata) => {
      console.log("onEvent", eventName, metadata);
      console.log("in on event");
      if (eventName === "HANDOFF") {
        console.log("found the handoff handler");
        this.props.history.push("/charity");
      }
    };

    const onSuccess = (token, metadata) => {
      console.log("In the on success function?")
      console.log("onSuccess", token, metadata);
      this.getAccessToken(token);
    };

    return (
      <div>
        <Topbar />
        <div class="plaidContainer">
              <div class="plaidCard">
                <img src={plaidIcon} class='plaidImg'/>
                <h1 class="plaidH1">
                  text
                </h1>
                <p class="plaidP">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
                <div class="plaidRow">
                  <br/>
                  <PlaidLink
                    className="plaidLink"
                    token={this.getLinkToken() ? this.getLinkToken() : ""}
                    onExit={onExit}
                    onSuccess={onSuccess}
                    onEvent={onEvent}
                  >
                    Connect
                  </PlaidLink>
                </div>
                
              </div>
        </div>
      </div>
      
    );
  }
}

export default BankChoice;
