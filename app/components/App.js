var React = require('react')
var Popular = require('./Popular')

// state
// lifecycle event - shown to screen removed from screen ... etc
// UI of the component - required 

class App extends React.Component {
	render() {
		
		return (
			<div className= 'container'>
				<Popular />
			</div>
		)
	}
}

module.exports = App;