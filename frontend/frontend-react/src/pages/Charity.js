import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bagClub from '../img/bagClubIcon.svg';
import bailProject from '../img/bailProjectIcon.svg';
import feedingAmerica from '../img/feedingAmericaIcon.svg';
import roomToRead from '../img/roomToReadIcon.svg';
import unitedWay from '../img/unitedWayIcon.svg';
import waterOrg from '../img/waterOrgIcon.svg';

import { charitySelect, charityStatus } from '../connections/userConnections'

class Charity extends React.Component {
  constructor() {
    super();
    this.state = {
		loaded: false,
      	charity: '',
    };
  }

  async componentWillMount() {
		if (window.localStorage.hasOwnProperty("jwt") === false) {
			this.props.history.push('/');
			return;
		}
		let result = await charityStatus(window.localStorage.getItem("jwt"))
		
		this.setState({
			loaded: true,
			charity: result.message.charity
		})
  }

	handleClick = async (e) => {
		await console.log(e)
		await charitySelect(window.localStorage.getItem("jwt"), e.target.id)
		await this.setState({
			charity: e.target.id
		})

	}

	render() {
		console.log(this.state)
		let bagClass = (this.state.charity === 'boys and girls club')?'selected':''
		let bailClass = (this.state.charity === 'bail project')?'selected':''
		let feedingClass = (this.state.charity === 'feeding america')?'selected':''
		let roomClass = (this.state.charity === 'room to read')?'selected':''
		let unitedClass = (this.state.charity === 'united way')?'selected':''
		let waterClass = (this.state.charity === 'water.org')?'selected':''

		let mainContent
		if (this.state.loaded) {
			mainContent = (
				<div>
					<div class="cardRow">
						<div class="col">
								<div class={"card "+ bagClass}>
									<a target="_blank" href="https://www.bgca.org">
										<img class="charityIcon" src={bagClub}/>
									</a>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
									</p>
									<button class="btnDarkGradient" id="boys and girls club"  onClick={this.handleClick}>
										select
									</button>
								</div>
						</div>
						<div class="col">
								<div class={"card "+ bailClass}>
									<a target="_blank" href="https://bailproject.org">
										<img class="charityIcon" src={bailProject}/>
									</a>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
									</p>
									<button class="btnDarkGradient" id="bail project"  onClick={this.handleClick}>
										select
									</button>
								</div>
						</div>
						<div class="col">
								<div class={"card "+ feedingClass}>
									<a target="_blank" href="https://www.feedingamerica.org">
										<img class="charityIcon" src={feedingAmerica}/>
									</a>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
									</p>
									<button class="btnDarkGradient" id="feeding america"  onClick={this.handleClick}>
										select
									</button>
								</div>
						</div>
					</div>
					<div class="cardRow">
						<div class="col">
								<div class={"card "+ roomClass}>
									<a target="_blank" href="https://www.roomtoread.org">
										<img class="charityIcon" src={roomToRead}/>
									</a>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
									</p>
									<button class="btnDarkGradient" id="room to read"  onClick={this.handleClick}>
										select
									</button>
								</div>
						</div>
						<div class="col">
								<div class={"card "+ unitedClass}>
									<a target="_blank" href="https://www.unitedway.org">
										<img class="charityIcon" src={unitedWay}/>
									</a>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
									</p>
									<button class="btnDarkGradient" id="united way"  onClick={this.handleClick}>
										select
									</button>
								</div>
						</div>
						<div class="col">
								<div class={"card "+ waterClass}>
									<a target="_blank" href="https://www.water.org">
										<img class="charityIcon" src={waterOrg}/>
									</a>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
									</p>
									<button class="btnDarkGradient" id="water.org"  onClick={this.handleClick}>
										select
									</button>
								</div>
						</div>
					</div>
				</div>
			)
		}
		else {
			mainContent = (
				<div>
					<div class="cardRow">

					</div>
					<div class="cardRow">
						
					</div>
				</div>
			)
		}

		return(
			<div>
				<Navbar />
				<div class="charityCenter">
					<h1 class="landingH1">
						Pick a cause that matters to you.
					</h1>
				</div>
				{ mainContent }
				
				
		    </div>
			
		)
	}

}

export default Charity;
