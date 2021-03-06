import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'

class Home extends React.Component {
	constructor() {
		super()
		this.transition = this.transition.bind(this)
	}

	transition() {
		document.querySelectorAll('.play-pause-button').forEach(button => {
			button.addEventListener('click', e => {
				if(button.classList.contains('playing')) {
						button.classList.remove('paused', 'playing');
						button.classList.add('paused');
				} else {
						if(button.classList.contains('paused')) {
								button.classList.add('playing');
						}
				}
				if(!button.classList.contains('paused')) {
						button.classList.add('paused');
				}
			});
		});
	}

	

	componentDidMount() {
		this.transition()
		console.log(this.props.history)
		console.log(window.localStorage.getItem("jwt"))
		if (window.localStorage.getItem("jwt") == 'null') {
			this.props.history.push("/")
		}
	}
	
	render() {
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
							<div class="buttons">
								<button class="play-pause-button">
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
				
						
				</section>
				<div class="wave">
					<svg viewBox="0 0 500 150" preserveAspectRatio="none" class="svgStyle">
						<path d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z" class="pathStyle"></path>
					</svg>
				</div>
				<section class="moreInfo">

				</section>
		  </div>
		  
		)
	}
}

export default Home;