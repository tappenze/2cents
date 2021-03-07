import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import NavbarLanding from '../components/NavbarLanding'
import svg from '../img/undraw_review_fkgn.svg'

class LandingPage extends React.Component {
	constructor() {
		super()
		this.redirect = this.redirect.bind(this)

	}

	redirect() {
		console.log(this.props)
		console.log(window.localStorage.getItem("jwt"))
		if (window.localStorage.hasOwnProperty("jwt") === true) {
			// console.log("jwt is not null")
			this.props.history.push("/home")
		}
		else {
			console.log("jwt is null")
		}
	}

	componentDidMount() {
		this.redirect()
	}

	render() {
		return(
			<div>
				<NavbarLanding />
				<section class="landing">
					<div class="row">
						<div class="col">
						
							
								<h1 class="landingH1">
									Building Karma on autopilot
								</h1>
								
						
							<p class="landingP">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
							</p>
							<div class="">
								<a class="btnGradient" href="/signin">Get Started</a>
							</div>
						</div>
						<div class="col">
							<img src={svg}/>
						</div>
					</div>
				</section>
				<section class="info">
				<div class="row">
					<div class="col bios">
						<i class="fas fa-shield-alt"></i>
						<h1>
							Secure
						</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						</p>
					</div>
					<div class="col">
						<div class="bios">
							<i class="fas fa-search-dollar"></i>
							<h1>
								Transparent
							</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							</p>
						</div>
						
					</div>
					<div class="col bios">
						<i class="fas fa-hand-holding-usd"></i>
						<h1>
							Non-profit
						</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						</p>
					</div>
				</div>
						
				</section>
				<div class="wave">
					<svg viewBox="0 0 500 150" preserveAspectRatio="none" class="svgStyle">
						<path d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z" class="pathStyle"></path>
					</svg>
				</div>
				<section class="moreInfo">
					<div class="row">
						<div class="col">	
							<div class="slider">
								<h1 class="landingH1">
									Most major banks accepted
								</h1>
								<div class="slider-row"></div>
							</div>
						</div>
					</div>
					
					
				</section>
		  </div>
		)
	}
}

export default LandingPage;