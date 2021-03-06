import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'
import bagClub from '../img/bagClubIcon.svg'
import bailProject from '../img/bailProjectIcon.svg'
import feedingAmerica from '../img/feedingAmericaIcon.svg'
import roomToRead from '../img/roomToReadIcon.svg'
import unitedWay from '../img/unitedWayIcon.svg'
import waterOrg from '../img/waterOrgIcon.svg'

class Charity extends React.Component {
	constructor() {
		super()
		this.state = {
			charity: "none"
		}
	}

	componentDidMount() {
		console.log("localStorage.get", window.localStorage.getItem("jwt"))
		if (window.localStorage.getItem("jwt") == 'null') {
			this.props.history.push("/")
		}
	}

	radioChange = (e) => {
		this.setState({
			charity: e.currentTarget.id
		})
		
	}

	render() {
		console.log(this.state)
		let bagClass = ''
		let bailClass = ''
		let feedingClass = ''
		let roomClass = ''
		let unitedClass = ''
		let waterClass = ''

		return(
			<div>
				<Navbar />
				<h1 class="landingH1">
					Who's lives do you want to change?
				</h1>
				<div class="row">
					
					<div class="col">
						<a class={"card "+ bagClass} target="_blank" href="https://www.bgca.org">
							<img src={bagClub}/>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							</p>
							<input id="boys and girls club" type="radio" checked={this.state.charity === "boys and girls club"} onChange={this.radioChange} />
						</a>
					</div>

					<div class="col">
						<a class={"card "+ bailClass} target="_blank" href="https://bailproject.org">
							<img src={bailProject}/>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							</p>
							<input id="bail project" type="radio" checked={this.state.charity === "bail project"} onChange={this.radioChange} />
						</a>
					</div>
					<div class="col">
						<a class={"card "+ feedingClass} target="_blank" href="https://www.feedingamerica.org">
							<img src={feedingAmerica}/>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							</p>
							<input id="feeding america" type="radio" checked={this.state.charity === "feeding america"} onChange={this.radioChange} />
						</a>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<a class={"card "+ roomClass} target="_blank" href="https://www.roomtoread.org">
							<img src={roomToRead}/>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							</p>
							<input id="room to read" type="radio" checked={this.state.charity === "room to read"} onChange={this.radioChange} />
						</a>
					</div>
					<div class="col">
						<a class={"card "+ unitedClass} target="_blank" href="https://www.unitedway.org">
							<img src={unitedWay}/>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							</p>
							<input id="united way" type="radio" checked={this.state.charity === "united way"} onChange={this.radioChange} />
						</a>
					</div>
					<div class="col">
						<a class={"card "+ waterClass} target="_blank" href="https://water.org">
							<img src={waterOrg}/>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							</p>
							<input id="water.org" type="radio" checked={this.state.charity === "water.org"} onChange={this.radioChange} />
						</a>
					</div>
				</div>
		  </div>
			
		)
	}
}

export default Charity;