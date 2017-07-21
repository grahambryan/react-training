var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

//Created components 
var Popular = require('./Popular')
var Nav = require('./nav')
var Home = require('./Home')
var Battle = require('./Battle')


// state
// lifecycle event - shown to screen removed from screen ... etc
// UI of the component - required 

class App extends React.Component {
  render() {		
  	return (
  	  <Router>
	  	<div className= 'container'>
	  	  <Nav />
	  	    <Switch>
		  	  <Route exact path='/' component={Home} />
		  	  <Route path='/Battle' component={Battle} />	
		  	  <Route path='/popular' component={Popular} />	
		  	  <Route render={function () {
		  	  	return <p>Not Found</p> //for path that is not one of the above
		  	  }} /> 
	  	    </Switch>  
	  	</div>
	  </Router>
	)
  }
}

module.exports = App;