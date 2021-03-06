import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'


class Navbar extends React.Component {
	render() {
		return(
			<div>
		      <div class="nav">
		          <div class="left">
		            <h1 class="logo">2 Cents</h1>
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
		            <div class="buttons item">
		              <a class="btn1" href="/signin">Get Started</a>
		            </div>
		            
		          </div>
		        </div>
		    </div>
		)
	}
}

export default Navbar;