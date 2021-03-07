import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { updateActivity, charityStatus, getUser } from '../connections/userConnections';
import { getTransactions, transactionsToDonations } from '../connections/makeDonations';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      initial: false,
      active: false,
    };
    console.log('constructor state', this.state);
    this.transition = this.transition.bind(this);
  }

  transition() {
    let button = document.querySelector('.play-pause-button');
    if (button !== null) {
      button.classList.remove('paused', 'playing');
      if (this.state.initial) {
        button.classList.add('playing');
      } else {
        button.classList.add('paused');
      }
    }
    document.querySelectorAll('.play-pause-button').forEach((button) => {
      button.addEventListener('click', (e) => {
        if (button.classList.contains('playing')) {
          button.classList.remove('paused', 'playing');
          button.classList.add('paused');
        } else {
          if (button.classList.contains('paused')) {
            button.classList.add('playing');
          }
        }
        if (!button.classList.contains('paused')) {
          button.classList.add('paused');
        }
      });
    });
  }

  async componentWillMount() {
    if (window.localStorage.hasOwnProperty('jwt') === false) {
      this.props.history.push('/');
    }
    let result = await charityStatus(window.localStorage.getItem('jwt'));
    if (result.message.charity == "none") {
			this.props.history.push("/charity")
		}
    this.setState({
      loaded: true,
      initial: result.message.active,
      active: result.message.active,
    });
    console.log('cDM state', this.state);
    await this.transition();
    console.log(this.props.history);

		let jwt = window.localStorage.getItem('jwt')
		let userRes = await getUser(jwt);
		let user = userRes.message
		console.log("user is")
		console.log(user)
		const accessToken = user.accessToken;
		console.log(accessToken)
		let transactionsRes = await getTransactions(accessToken);
		let transactions = transactionsRes.transactions;
		console.log(transactions);
		await transactionsToDonations(transactions, user.activityHistory, [])
  }

  handleClick = async () => {
    await updateActivity(
      window.localStorage.getItem('jwt'),
      !this.state.active
    );
    this.setState({
      active: !this.state.active,
    });
  };

  isActiveText = () => {
		console.log("here")
    if (this.state.active) {
      return <p class='landingP'>You currently have rounding-up donations on.</p>;
    } else {
      return (
        <p class='landingP'>
          You currently have rounding-up donations off.
        </p>
      );
    }
  };

  render() {
    console.log('render state', this.state);
    let mainContent;
    if (this.state.loaded) {
      mainContent = (
        <div class='row'>
          <div class='col'>
            <h1 class='landingH1'>Building Karma on autopilot.</h1>

            {this.isActiveText()}
            <div class='buttons' onClick={this.handleClick}>
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
      );
    } else {
      mainContent = (
        <div class='row'>
          <div class='col'></div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <section class='landing'>{mainContent}</section>
        <section class='info'>
          <div class='row'>
            <div class='col bios'>
              <i class='fas fa-shield-alt'></i>
              <h1>Secure</h1>
              <p>
                Powered by Plaid, you can trust that your banking data is safe.
                We don't have access to any of your account information.
              </p>
            </div>
            <div class='col'>
              <div class='bios'>
                <i class='fas fa-search-dollar'></i>
                <h1>Transparent</h1>
                <p>
                  You have direct control over where your money goes and can
                  disable donations at any time.
                </p>
              </div>
            </div>
            <div class='col bios'>
              <i class='fas fa-hand-holding-usd'></i>
              <h1>Non-profit</h1>
              <p>
                We don't make a cent off of your goodwill. Every penny goes
                right to the charity of your choice.
              </p>
            </div>
          </div>
        </section>
        <div class='wave'>
          <svg
            viewBox='0 0 500 150'
            preserveAspectRatio='none'
            class='svgStyle'
          >
            <path
              d='M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z'
              class='pathStyle'
            ></path>
          </svg>
        </div>
        <section class='moreInfo'>
          <div class='row'>
            <div class='col'>
              <div class='slider'>
                <h1 class='landingH1'>Most major banks accepted</h1>
                <div class='slider-row'></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
