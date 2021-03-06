import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import logo from '../img/2centsLogo.svg'


class Navbar extends React.Component {
	signout = () => {
		window.localStorage.setItem("jwt", null)
	}

	render() {
		return(
			<div>
		      <div class="nav">
		          <div class="left">
                    <a href="/home">
		                <img src={logo} class='logo'/>
                    </a>
		          </div>
		          <div class="right">
		            <a class="item" href="/about">
		              about
		            </a>
		            <a class="item" href="/charity">
		              charity
		            </a>
		            <a class="item" href="/donations">
		              donations
		            </a>
		            <div class="">
		              <a class="btnGradient" href="/" onClick={this.signout.bind(this)}>Sign Out</a>
		            </div>
		            
		          </div>
		        </div>
		    </div>
		)
	}
}

export default Navbar;