import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'

class NoMatch extends React.Component {
	render() {
		return(
			<div>
		      <h1>no match</h1>
		    </div>
		)
	}
}

export default NoMatch;