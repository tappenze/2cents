import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Navbar from '../components/Navbar'

class Donations extends React.Component {
	render() {
		return(
			<div>
				<Navbar />
		      <h1>donations</h1>
		    </div>
		)
	}
}

export default Donations;