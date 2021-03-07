import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import logo from "../img/2centsLogo.svg";

class NavbarLanding extends React.Component {
  render() {
    return (
      <div>
        <div class="nav">
          <div class="left">
            <a href="/">
              <img src={logo} class="logo" />
            </a>
          </div>
          <div class="right">
            <div class="">
              <a class="btnGradient" href="/signin?#">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarLanding;
