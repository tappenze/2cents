import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import PropTypes from "prop-types";
import { withRouter } from "react-router";


class DonationSwitchUser extends React.Component {
	static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor() {
        super()
        
        this.state = {
            global: false
        }
    }

    

    componentDidMount() {

    }

    handleGlobeClick = () => {
        if (!this.state.global) {
            this.setState({
                global: true
            })
            this.props.history.push('/social')
        }
        
    }
    

	render() {
        
        const { match, location, history } = this.props
        // console.log(this.state)
        let globalClass = this.state.global?'--selectedRadio':'--noSelectedRadio'
        let userClass = this.state.global?'--noSelectedRadio':'--selectedRadio'
		return(
			<div>
                <br/>
                <br/>
		      <div class="noShadowNav">
		          <div class="middle">
                    <span class="btnGroup">
                        <button class={ "btnGroup--radiobtn" + globalClass } onClick={this.handleGlobeClick}><i class="fas fa-globe-americas"></i></button>
                        <button class={ "btnGroup--radiobtn" + userClass }><i class="fas fa-user"></i></button>
                    </span>
		          </div> 
		      </div>
		    </div>
		)
	}
}

export default withRouter(DonationSwitchUser);