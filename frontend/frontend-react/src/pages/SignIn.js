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
			email: '',
			validEmail: true,
			password: '',
			validPassword: true,
			message: 'Email invalid'
		}

		this.transition = this.transition.bind(this)

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

	// login() {
	// 	console.log("login")
	// }

	handlePasswordChange = (event) => {
		this.setState({
			password: event.target.value
		})
	}

	handleEmailChange = (event) => {
		this.setState({
			email: event.target.value
		})
		
	}

	signup = async () => {
		const passRe = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
		const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		const passErr = passRe.test(this.state.password)
		const emailErr = emailRe.test(this.state.email)
		if (!passErr || !emailErr) {
			if (!passErr) {
				this.setState({
					validPassword: false
				})
			}
			if (!emailErr) {
				this.setState({
					validEmail: false,
				})
			}
			return
		}
		else {
			console.log(this.state)
			let result = await signup(this.state.email, this.state.password);
			console.log(result)
			console.log(result.status)
			console.log(result.message)
			if (result.status == 200) {
				window.localStorage.setItem('jwt', JSON.stringify(result.message))
				this.props.history.push("/home")
				return
			}
			else {
				this.setState({
					message: result.message,
					validEmail: false
				})
				return
			}
		}
		
		

		// window.localStorage.setItem('jwt', result)
		// console.log("localStorage.get", window.localStorage.getItem("jwt"))
	}

	render() {
		let emailSpan = this.state.validEmail?'invis':'showErr'
		let passSpan = this.state.validPassword?'invis':'showErr'
		let message = this.state.message


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
								<input type="submit" value="Login" class="btnGradient"/>
							</form>
							<form action="#" class="sign-up-form" onSubmit={this.signup}>
								<h2 class="title">Sign up</h2>
								<div class="input-field">
									<i class="fas fa-envelope"></i>
									<input class="emailInput" type="text" placeholder="Email" onChange={this.handleEmailChange}/>
								</div>
								<span class={emailSpan}>{message}</span>
								<br/>
								<div class="input-field">
									<i class="fas fa-lock"></i>
									<input class="passInput" type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
								</div>
								<span class={passSpan}>Invalid password</span>
								<input type="submit" class="btnGradient" value="Sign up" />
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
								<button class="btn transparent" id="sign-in-btn" onClick={this.login}>
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