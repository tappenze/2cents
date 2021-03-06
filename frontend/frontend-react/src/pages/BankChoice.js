import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import { usePlaidLink } from "react-plaid-link";
import { PlaidLink } from "./PlaidLink";
import axios from "axios";
// import Link from './Link';

class BankChoice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      linkToken: "",
      accessToken: "",
      itemID: ""
    };

  }
  componentDidMount() {
    console.log("localStorage.get", window.localStorage.getItem("jwt"));
    this.createLinkToken();
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
    console.log("client side public token", publicToken)
    //sends the public token to the app server
    const res = await axios.post('http://localhost:5000/api/get_access_token', {publicToken: publicToken})
    console.log("return from get access token with public toke  is");
    console.log(res);
    const data = res.data
    //updates state with permanent access token
    this.setState({ accessToken: data.access_token})
    this.setState({ itemID: data.item_id})
  }

  handleSubmit = async (event) => {
    // just make the call to the backend here and console log it
  };

  getLinkToken = () => {
    console.log("getting link token for our little button")
    console.log(this.state.linkToken)
    return this.state.linkToken;
  };

  render() {
    const onExit = (error, metadata) => console.log("onExit", error, metadata);

    const onEvent = (eventName, metadata) => {
      console.log("onEvent", eventName, metadata);
    };

    const onSuccess = (token, metadata) => {
      console.log("onSuccess", token, metadata);
      this.getAccessToken(token);
    };
    return (
      <div>
        <PlaidLink
          className="CustomButton"
          style={{ padding: "20px", fontSize: "16px", cursor: "pointer" }}
          token={this.getLinkToken() ? this.getLinkToken() : ""}
          onExit={onExit}
          onSuccess={onSuccess}
          onEvent={onEvent}
        >
          Open Link and connect your bank!
        </PlaidLink>
        {/* <div class="container" id="container">
          <div class="forms-container">
            <div class="signin-signup">
              <form action="#" class="sign-in-form">
                <h2 class="title">Enter bank credentials</h2>
                <div class="input-field">
                  <i class="fas fa-user"></i>
                  <input type="text" placeholder="Username" />
                </div>
                <div class="input-field">
                  <i class="fas fa-lock"></i>
                  <input type="password" placeholder="Password" />
                </div>
                <input type="submit" value="Login" class="btnGradient" />
              </form>
              <form action="#" class="sign-up-form" onSubmit={this.handleSubmit}>
                <h2 class="title">Sign up</h2>
                <div class="input-field">
                  <i class="fas fa-envelope"></i>
                  <input
                    class="emailInput"
                    type="text"
                    placeholder="Email"
                    onChange={this.handleUserNameChange}
                  />
                </div>
                <br />
                <div class="input-field">
                  <i class="fas fa-lock"></i>
                  <input
                    class="passInput"
                    type="password"
                    placeholder="Password"
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <input type="submit" class="btnGradient" value="Sign up" />
              </form>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default BankChoice;
