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
      this.props.history.push("/home");
      // do some sort of popup to mark that the user is done signing up
    } else {
      await charitySelect(window.localStorage.getItem("jwt"), e.target.id);
      await this.setState({
        charity: e.target.id,
      });
    }
  };


  render() {
    console.log(this.state);
    let bagClass =
      this.state.charity === "boys and girls club" ? "selected" : "";
    let bailClass = this.state.charity === "bail project" ? "selected" : "";
    let feedingClass =
      this.state.charity === "feeding america" ? "selected" : "";
    let roomClass = this.state.charity === "room to read" ? "selected" : "";
    let unitedClass = this.state.charity === "united way" ? "selected" : "";
    let waterClass = this.state.charity === "water.org" ? "selected" : "";

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
									The Bail Project combats mass incarceration by disrupting the
									money bail system—one person at a time. 100% of online
									donations are used to bring people home
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
									What began in 1979 as a clearinghouse for national food
									donations is now the nation’s largest domestic hunger-relief
									organization—a powerful and efficient network of 200 food
									banks across the country.
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
									Room to Read seeks to transform the lives of millions of
									children in low-income communities by focusing on literacy and
									gender equality in education.{" "}
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
									United Way’s mission is to improve lives by mobilizing the
									caring power of communities around the world to advance the
									common good.
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
									Water.org is a global nonprofit organization working to bring
									water and sanitation to the world in a way that's safe,
									accessible, and cost-effective.
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
