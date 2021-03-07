import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'
import { updateActivity, charityStatus } from "../connections/userConnections";


class Home extends React.Component {
	constructor() {
		super()
		this.state = {
			initial: true,
			active: true
		}
		this.transition = this.transition.bind(this)
	}

	transition() {
		document.querySelectorAll('.play-pause-button').forEach(button => {
			if(this.state.initial) {
				button.classList.remove('paused', 'playing');
				button.classList.add('paused');
			}
			else {
				button.classList.remove('paused', 'playing');
				button.classList.add('playing');
			}
			button.addEventListener('click', e => {
				if(button.classList.contains('playing')) {
						button.classList.remove('paused', 'playing');
						button.classList.add('paused');
				} else {
						if(button.classList.contains('paused')) {
								button.classList.add('playing');
						}
				}
				if(!this.state.initial) {
					button.classList.add('paused');
				}
				
			});
		});

	}

	

	async componentDidMount() {
		console.log("home jwt", window.localStorage.getItem("jwt"))
		if (window.localStorage.getItem("jwt") == 'null') {
			this.props.history.push("/")
		}

		console.log(charityStatus(window.localStorage.getItem("jwt")))
		let initialVal = await charityStatus(window.localStorage.getItem("jwt"))
		this.setState({
			initial: initialVal.message.active,
			active: initialVal.message.active
		})
		this.transition()

		console.log(this.props.history)
		

	}

	handleClick = async (e) => {
		this.setState({
			active: !this.state.active
		})
		await updateActivity(window.localStorage.getItem("jwt"), this.state.active)
	}
	
	render() {
		console.log("render", this.state)
		return(
			<div>
				<Navbar />
		    <section class="landing">
					<div class="row">
						<div class="col">
						
							<h1 class="landingH1">
								Building Karma on autopilot
							</h1>		
						
							<p class="landingP">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
							</p>
							<div class="buttons" onClick={this.handleClick}>
								<button class='play-pause-button'>
										<i>P</i>
										<i>l</i>
										<i>a</i>
										<i>y</i>
										<i>use</i>
								</button>
							</div>
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

export default Home;