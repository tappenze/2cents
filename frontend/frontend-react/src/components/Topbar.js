import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import logo from '../img/2centsLogo.svg'


class Topbar extends React.Component {
	signout = () => {
		window.localStorage.removeItem("jwt")
	}

	render() {
		return(
			<div>
		      <div class="nav">
		          <div class="middle">
                    <img src={logo} class='logo'/>
		          </div> 
		      </div>
		    </div>
		)
	}
}

export default Topbar;