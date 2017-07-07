var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types')
require('./index.css'); // css loader in webpack allows this to work 

// <App /> how you tell react to use the component in html
var App = require('./components/App')


ReactDOM.render(
	<App />,
	document.getElementById('app') //html that has ID #app 
);



