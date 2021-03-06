import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bagClub from '../img/bagClubIcon.svg';
import bailProject from '../img/bailProjectIcon.svg';
import feedingAmerica from '../img/feedingAmericaIcon.svg';
import roomToRead from '../img/roomToReadIcon.svg';
import unitedWay from '../img/unitedWayIcon.svg';
import waterOrg from '../img/waterOrgIcon.svg';

import { charitySelect, charityStatus, updateActivity } from '../connections/userConnections'

class Charity extends React.Component {
  constructor() {
    super();
    this.state = {
      charity: 'none',
    };
  }

  async componentDidMount() {
    if (window.localStorage.getItem('jwt') == 'null') {
      this.props.history.push('/');
      return;
    }
    let jwt = window.localStorage.getItem('jwt');
		// console.log("jwt is")
		// console.log(jwt)
		// console.log(await charitySelect(jwt, "red cross"))
		// console.log(await charityStatus(jwt))
		// console.log(await updateActivity(jwt, true))



  }


	handleClick = (e) => {
		this.setState({
			charity: e.currentTarget.id
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

		return(
			<div>
				<Navbar />
				<div class="charityCenter">
					<h1 class="landingH1">
						Who's lives do you want to change?
					</h1>
				</div>
				
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

}

export default Charity;
