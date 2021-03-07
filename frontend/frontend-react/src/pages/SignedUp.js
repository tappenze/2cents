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

class SignedUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  handleClick = () => {
      this.props.history.push('/home')
  }
  
  render() {
    

    return (
      <div>
        <Topbar />
        <div class="plaidContainer">
              <div class="plaidCard">
              

              <div class="flex-container">
					<div class="unit">
						<div class="heart">
							<div class="heart-piece-02">
							</div>
							<div class="heart-piece-12">
							</div>
							<div class="heart-piece-22">
							</div>
							<div class="heart-piece-32">
							</div>
							<div class="heart-piece-42">
							</div>
							<div class="heart-piece-52">
							</div>
							<div class="heart-piece-62">
							</div>
							<div class="heart-piece-72">
							</div>
							<div class="heart-piece-82">
							</div>
						</div>
					</div>
				</div>
                <h1 class="plaidH1">
                  CONGRATS
                </h1>
                <p class="plaidP">
                  You're all set to start donating! Thank you in advance for you contributions!
                </p>
                <div class="plaidRow">
                  <br/>
                  <button class="btnGradient" onClick={this.handleClick}>  :)  </button>
                </div>
                
              </div>
        </div>
        
        
      </div>
      
    );
  }
}

export default SignedUp;
