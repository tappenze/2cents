import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import svg1 from '../img/undraw_programmer_imem-2.svg'
import svg2 from '../img/undraw_web_developer_p3e5.svg'
import {signup, login} from '../connections/userConnections'

class SignIn extends React.Component {
	constructor() {
		super()
		this.state = {
			username: '',
			validUsername: false,
			password: '',
			validPassword: false
		}

		this.transition = this.transition.bind(this)
		// this.signup = this.signup.bind(this)
		// this.login = this.login.bind(this)
		// this.handleEmailChange = this.handleEmailChange.bind(this)
		// this.handlePasswordChange = this.handlePasswordChange.bind(this)
	}

	transition() {
		window.addEventListener('load', 
		  function() { 
		    const sign_in_btn = document.getElementById("sign-in-btn");
		    const sign_up_btn = document.querySelector("#sign-up-btn");

		    console.log(sign_in_btn)
		    console.log(sign_up_btn)

		    sign_up_btn.addEventListener("click", () => {
		      const container = document.querySelector(".container")
		      container.classList.add("sign-up-mode")
		    });

		    sign_in_btn.addEventListener("click", () => {
		      const container = document.querySelector(".container")
		      container.classList.remove("sign-up-mode")
		    });
		  }, false);
	}

	componentDidMount() {
		console.log("componenetDidMount")
		this.transition()
	}

	signup() {
		console.log("signup")
	}

	// login() {
	// 	console.log("login")
	// }

	handlePasswordChange = (event) => {
		
		this.setState({
			password: event.target.value
		})
	}

	handleUsernameChange = (event) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		this.setState({
			username: event.target.value,
			validUsername: re.test(event.target.value)
		})
		
	}

	signup = async () => {
		console.log("heeeeee")
		console.log(this.state)
		let result = await signup(this.state.username, this.state.password);
		console.log("result is")
		console.log(result)
		// window.localStorage.setItem('jwt', result)
		// console.log("localStorage.get", window.localStorage.getItem("jwt"))
	}

	render() {
		return(
			<div>
				<div class="container" id="container">
					<div class="forms-container">
						<div class="signin-signup">
							<form action="#" class="sign-in-form" >
								<h2 class="title">Sign in</h2>
								<div class="input-field">
									<i class="fas fa-user"></i>
									<input type="text" placeholder="Username" />
								</div>
								<div class="input-field">
									<i class="fas fa-lock"></i>
									<input type="password" placeholder="Password" />
								</div>
								<input type="submit" value="Login" class="btn solid"/>
							</form>
							<form action="#" class="sign-up-form" onSubmit={this.signup}>
								<h2 class="title">Sign up</h2>
								<div class="input-field">
									<i class="fas fa-envelope"></i>
									<input type="text" placeholder="Email" onChange={this.handleUsernameChange}/>
								</div>
								<div class="input-field">
									<i class="fas fa-lock"></i>
									<input type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
								</div>
								<input type="submit" class="btn" value="Sign up" />
							</form>
						</div>
					</div>

					<div class="panels-container">
						<div class="panel left-panel">
							<div class="content">
								<h3>New here ?</h3>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
									ex ratione. Aliquid!
								</p>
								<button class="btn transparent" id="sign-up-btn">
									Sign up
								</button>
							</div>
							<img src={svg1} class="image" alt="" />
						</div>
						<div class="panel right-panel">
							<div class="content">
								<h3>One of us ?</h3>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
									laboriosam ad deleniti.
								</p>
								<button class="btn transparent" id="sign-in-btn" onclick={this.login}>
									Sign in
								</button>
							</div>
							<img src={svg2} class="image" alt="" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SignIn;