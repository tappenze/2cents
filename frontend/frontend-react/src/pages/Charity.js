import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import bagClub from "../img/bagClubIcon.svg";
import bailProject from "../img/bailProjectIcon.svg";
import feedingAmerica from "../img/feedingAmericaIcon.svg";
import roomToRead from "../img/roomToReadIcon.svg";
import unitedWay from "../img/unitedWayIcon.svg";
import waterOrg from "../img/waterOrgIcon.svg";

import { charitySelect, charityStatus } from "../connections/userConnections";

class Charity extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      charity: "none",
    };
	
  }


  async componentWillMount() {
    if (window.localStorage.hasOwnProperty("jwt") === false) {
      this.props.history.push("/");
      return;
    }
	
    let result = await charityStatus(window.localStorage.getItem("jwt"));
    this.setState({
      loaded: true,
      charity: result.message.charity,
    });
	
  }


  handleClick = async (e) => {
    await console.log(e);
    let result = await charityStatus(window.localStorage.getItem("jwt"));
    if (result.message.charity === "none") {
      await charitySelect(window.localStorage.getItem("jwt"), e.target.id);
      await this.setState({
        charity: e.target.id,
      });
      this.props.history.push("/signedup");
      // do some sort of popup to mark that the user is done signing up
    } else {
      await charitySelect(window.localStorage.getItem("jwt"), e.target.id);
      await this.setState({
        charity: e.target.id,
      });
    }
  };



  render() {
    // console.log(this.state);
    let bagClass =

      this.state.charity === "Boys and Girls Club" ? "selected" : "";
    let bailClass = this.state.charity === "Bail Project" ? "selected" : "";
    let feedingClass =
      this.state.charity === "Feeding America" ? "selected" : "";
    let roomClass = this.state.charity === "Room to Read" ? "selected" : "";
    let unitedClass = this.state.charity === "United Way" ? "selected" : "";
    let waterClass = this.state.charity === "Water.org" ? "selected" : "";

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
									Boys & Girls Clubs of America seeks to enable all young
									people, especially those who have the greatest need, to reach
									their full potential as productive, caring, responsible
									citizens.{" "}
									</p>
									<button class="btnDarkGradient" id="Boys and Girls Club"  onClick={this.handleClick}>
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
									The Bail Project combats mass incarceration by disrupting the
									money bail system—one person at a time. 100% of online
									donations are used to bring people home
									</p>
									<button class="btnDarkGradient" id="Bail Project"  onClick={this.handleClick}>
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
									What began in 1979 as a clearinghouse for national food
									donations is now the nation’s largest domestic hunger-relief
									organization—a powerful and efficient network of 200 food
									banks across the country.
									</p>
									<button class="btnDarkGradient" id="Feeding America"  onClick={this.handleClick}>
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
									Room to Read seeks to transform the lives of millions of
									children in low-income communities by focusing on literacy and
									gender equality in education.{" "}
									</p>
									<button class="btnDarkGradient" id="Room to Read"  onClick={this.handleClick}>
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
									United Way’s mission is to improve lives by mobilizing the
									caring power of communities around the world to advance the
									common good.
									</p>
									<button class="btnDarkGradient" id="United Way"  onClick={this.handleClick}>
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
									Water.org is a global nonprofit organization working to bring
									water and sanitation to the world in a way that's safe,
									accessible, and cost-effective.
									</p>
									<button class="btnDarkGradient" id="Water.org"  onClick={this.handleClick}>
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
				<div class="donationRowHeader">
					<div class="flex-container">
						<div class="unit">
							<div class="heart">
								<div class="heart-piece-0">
								</div>
								<div class="heart-piece-1">
								</div>
								<div class="heart-piece-2">
								</div>
								<div class="heart-piece-3">
								</div>
								<div class="heart-piece-4">
								</div>
								<div class="heart-piece-5">
								</div>
								<div class="heart-piece-6">
								</div>
								<div class="heart-piece-7">
								</div>
								<div class="heart-piece-8">
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
    return (
      <div>
        <Navbar />
        <div class="charityCenter">
          <h1 class="landingH1">Pick a cause that matters to you.</h1>
        </div>
        {mainContent}
      </div>
    );
  }
}

export default Charity;
