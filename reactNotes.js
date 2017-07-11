//react.js notes
// see /Users/gbryan/Desktop/dev/github-battle/
// online.reacttraining.com - tyler

//+
//+
//+
//+

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Section 1

/* React Compnents --- 
creating components - composition 
	having individual components control their own state 
	putting complexity into simple components, then putting them together 

Declarative -  What we want to have happen then how it should 
	Reducing side effects in your code - not modifying any state, (minimizing mutability)
 
Unidirectional Data Flow 
	state that you have to manage - this that change inside it
	We want to manage state inside your app
	this.setState ({ highlight: !this.state.highlight, })   
Tools:
	React Router - Map URL to Active Component 

		<Router>
			<Link></Link>
			<Route></Route>
		</Router>

	Webpack - Code bundler into one file 
		exports	
		entry: root component 
		transformations on your code
	
	Babel - code transformer 
		"babel": {
			"presets" : [
				"env",
				"react"
			]
		}

	Axios - HTTP Requests
		function getRepos(username) {
			return axios.get('https://api....com/users/' + username +'/repos' + param + '&per_page=100');
		}

-React's setState API is not decalarative
-React Components can be composed just like functions can be composed
*/

/*	npm
1) We want to make it easier to download different modules (since going to each module's specific website or github repo is a pain)

2) Make upgrading to newer versions of our modules simpler as well.

use NPM to manage different packages (modules) 
 - npm init 'creates package.json'
 - npm install 'installs modules and updates package.json when --save flag is used'
 - npm run test 'can add tests to package.json'
 //"scripts": {
 //  "test": "ava 'app/**.test.js' --verbose --require ./other/setup-ava-tests.js" } 
*/

/* Webpack - webpack.config.js
	a code bundler that transforms and bundles your code

1) webpack needs to know the starting point of your application, or your root JavaScript file.
	- entry: ''
2) webpack needs to know which transformations to make on your code.
	- loaders
	- module: {
    rules: [
      { test: /\.coffee$/, use: "coffee-loader" }
    ]
  	}
  	- npm install the specific loader first --save-dev
  	- this is where we will place babel 
3) webpack needs to know to which location it should save the new transformed code.
	-  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  	}
  	-
Ussual structure for an app - 2 index.html to worry about
/app
  - components
  - utils
  index.js
  index.html
/dist
  index.html
  index_bundle.js
package.json
webpack.config.js
.gitignore
- How do you solve this?
This plugin is the html-webpack-plugin. As always, you'll need to run npm install --save-dev html-webpack-plugin before you can use it. Now we just need to tell webpack what we want to do with it.
First thing, we'll need to create a new instance of HTMLWebpackPlugin and specify one thing, the template of what we want the newly created file to look like.

	plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  	]


Running Webpack - place in package.json
"scripts": {
  "build": "webpack" 
},
adding -w flag to webpack: will watch your files and re-execute webpack whenever any of the files Webpack is concerned about changes
-p:  ship to production, minify code.

terminal: npm run build - builds then places bundle in dist folder
*/ 
// Babel - tranformation from JSX so JS



/* React Components
-The parent/child hierarchy makes managing our data relatively simple because we know exactly where our data lives and we shouldn’t manipulate that data anywhere else.
-ReactDOM.render takes in two arguments. The first argument is the component you want to render, the second argument is the DOM node where you want to render the component

The DOM process:
Signal to notify our app some data has changed→ Re-render virtual DOM -> Diff previous virtual DOM with new virtual DOM -> Only update real DOM with necessary changes.

*/

var React = require('react');
var ReactDOM = require('react-dom');
class HelloWorld extends React.Component {
  render() { //only method - every component requires a react render method
    return (
      <div>Hello World!</div>
    )
  }
}
ReactDOM.render(<HelloWorld />, document.getElementById('app'));

/* Basic hello world react app ***************************************************************************

Getting started: 

	mkdir github-battle
	cd github-battle/
	npm init
	npm install --save react react-dom
		
	vim .gitignore <node_modules, dist ... >

	mkdir app
	cd app
	touch index.js
	touch index.css
	touch index.html

	npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react css-loader style-loader html-webpack-plugin webpack
	npm install --save-dev webpack-dev-server
	npm run start <added webpack-dev-server --open to "scripts" in package.json>

***************************************************************************************

in webpack.config.js ->  
-install webpack, with npm above, using dev dependencies --save-dev
 - entry, outputs
 - add rules
 	bable, css loaders 
 - add plugins 
 	- Templates
 	- webpack looks for template index.html then puts new one into dist folder creates two files, .html and bundle.js. It will automatically reference the script for index.js

in index.js -> require react, react-dom -state, lifecylce events, UI - use render method
	var React = require('react');
	var ReactDom = require('react-dom');
	require('./index.css'); // css loader in webpack allows this to work 
	-create react component with <class Compnent extends React.Component> 
	-Render react compnent with <ReactDom.render> 

#You can delete the dist folder while on the local server, all info is just locally cached. 
#the dist folder is just created when you run webpack
# Webpack loaders allow you to preprocess files as you require() or “load” them.
*/

//+
//+
//+
//+

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Section 2 

/* Dataflow with Props in React

How to pass information to our components. Passing data from one component to another child component, throth props. 

props
	- are to components what arguments are to functions */

class HelloUser extends React.Component {
  render() {
    return (
      <div> Hello, {this.props.name}</div>
    )
  }
}
ReactDOM.render(<HelloUser name="Tyler"/>, document.getElementById('app'));

//another example
class Avatar extends React.Component {
  render() {
    return (
      <img src={this.props.img} />
    )
  }
}

class Label extends React.Component {
  render() {
    return (
      <h1>Name: {this.props.name}</h1>
    )
  }
}

class ScreenName extends React.Component {
  render() {
    return (
      <h3>Username: {this.props.username}</h3>
    )
  }
}

class Badge extends React.Component {
  render() {
    return (
      <div>
        <Avatar img={this.props.user.img}/>
        <Label name={this.props.user.name}/>
        <ScreenName username={this.props.user.username}/>
      </div>
    )
  }
}

ReactDOM.render(
  <Badge user={{
    name: 'Tyler McGinnis',
    img: 'https://avatars0.githubusercontent.com/u/2933430?v=3&s=460',
    username: 'tylermcginnis'
  }} />,
  document.getElementById('app')
);

/* Creating Lists in React with .map and .filter

.map 
	- map over an array, modify each item, returns new array */
	var numbers = [1,2,3];
	var numbersPlusTen = numbers.map(function (num) {
	  return num + 10
	});
	console.log(numbersPlusTen) // [11, 12, 13]
 
// now in react 

class Users extends React.Component {
  render() {
    return (
      <ul>
        {this.props.list.map(function(list_index){ 
          return <li>{list_index}</li>; 
        })}        
      </ul>
    )
  }
}

ReactDOM.render(
  <Users list={['Tyler', 'Mikenzi', 'Ryan', 'Michael']} />,
  document.getElementById('app')
);


//using .filter to only look for certain things in a array
var friends = ['Ean', 'Tyler', 'Mikenzi', 'Eric', 'Jessica'];
var newFriends = friends.filter(function (friend) {
  return friend[0] === 'E'
});
console.log(newFriends) // ['Ean', 'Eric']

// react .filter and .map list
class Users extends React.Component {
  render() {

  	var friends = this.props.list.filter(function(user) { 
          return user.friend == true; 
          })
  	var nonfriends = this.props.list.filter(function(user) { 
          return user.friend !== true; 
          })


    return (
      <div>
        <h1>Friends</h1>
        <ul>
          {friends.map(function (user) { // filter returns array, then you can map over
            return <li key={user.name}>{user.name}</li> // would want user.name in key to be unique ussually like UID 
          })}
        </ul>
        
        <hr />
        
        <h1> Non Friends </h1>
           {nonfriends.map(function (user) {
            return <li key={user.name}>{user.name}</li> 
          })} 
        <ul>
        </ul>        
      </div>
    )
  }
}

ReactDOM.render(
  <Users list={[  // 
    { name: 'Tyler', friend: true },
    { name: 'Ryan', friend: true },
    { name: 'Michael', friend: false },
    { name: 'Mikenzi', friend: false },
    { name: 'Jessica', friend: true },
    { name: 'Dan', friend: false } ]} 
  />,
  document.getElementById('app')
);

//



/* Building UIs with Pure Functions and Function Composition and Nesting React Components  

- a function takes in some data and returns a view

Pure Funtions:
  - Pure functions always return the same result given the same arguments. 
  - Pure function's execution doesn't depend on the state of the application.
  - Pure functions don't modify the variables outside of their scope.

  React's render method needs to be a pure function and because it's a pure function, all of the benefits of pure functions now apply to your UI as well. 

Introduction to PropTypes
  -allow you to declare the "type" (string, number, function, etc) of each prop being passed to a component.
  -npm install prop-types
  */var React = require('react');
    var PropTypes = require('prop-types')
    class Users extends React.Component {
      render() {
        return (
          <ul>
            {this.props.list.map(function (friend) {
              return <li>{friend}</li>
            })}
          </ul>
        )
      }
    }
    Users.propTypes = {
      list: PropTypes.array.isRequired
    }/*
    - to use with functions - PropTypes.func, others: PropTypes.bool
    - can customize your own proptypes

//+
//+
//+
//+

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Section 3

  /* The "This" keyword + Managing and Updating State

  - Implicit binding
  - Explicit binding
  - new binding
  - window binding

  where is the function invoked

  Implicit Binding
    var me = {
      name: 'Ty',
      age: 25,
      sayName: function() {
        console.log(this.name);
      }
    };
    me.sayName // 'Ty'
    - the left of the "dot" . 
    -when the function was invoked and what is to the left of the dot, that is what the keyword is referencing 

  Explicit Binding
    - Call, apply, bind

     var sayName: function() {
        console.log('my name is '+this.name);
        };

    var stacey = {
      name: 'stacey',
      age: 34
    };

    sayName.call(stacey); //my name is stacey
    - .apply - can pass in an array of elements
    - .bind - almost the same as .call, but creates a function in which you can call later

  New Binding
    - using capital letter to say its a constructor
    var Animal = function(color,name,type){
      //this = {}
      this.color = color;
      this.name = name;
      this.type = type;    
    };
    var zebra = new Animal('black and white', 'Zorro', 'Zebra')

  Window Binding
    -
    var sayAge = function() {
      'use strict';
      console.log(this.age);
    }

    var me = {
      age: 25
    }

    sayAge(); // undefined if empty (), 
    window.age = 35;
    sayAge(); //undefined, 35, done want this key word to be bound to the window object 'use strict' and this wont be allowed


Built Popular.js component for github battle 

-.apply lets you pass in an array as the second argument, .call requires that parameters be listed explicitly

-var myUser = { 
   username: 'tyler', 
   age: 25, 
   email: 'tyler@gmail.com' 
 }; 
 var getMyUsername = function(){ 
   console.log(this.username); 
 }; 
 setTimeout(getMyUsername, 3000);  //this gives you //undefined 

 -.bind Returns a new function specifying the context ("this" keyword) inside that function
*/

//+
//+
//+
//+

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Section 4

/*  Stateless Functional Compnents 

"If you're using React correctly, you're going to notice you have a lot of components that simply take in some data via props and output some UI - that is, components with just a render method."

- when it just has a render method you can remove the React.Component abstraction
#e.g.  */
//This 
class HelloWorld extends React.Component {
  render () {
    return (
      <div>Hello {this.props.name}</div>
    )
  }
}
ReactDOM.render(<HelloWorld name='Tyler' />, document.getElementById('app'))

// Can be: 
function HelloWorld (props) {
  return (
    <div>Hello {props.name}</div>
  )
}
ReactDOM.render(<HelloWorld name='Tyler' />, document.getElementById('app'))/*

- This is a statless function, or a presentational component without state 

- If all your component has is a render() method, you can create a function that will just return the UI, 
    - you will no longer have the use of "this" but just pass in "props"
    
/* Private Components in React*/

function FriendItem (props) {
  return <li>{props.friend}</li>
}
function FriendsList (props) {
  return (
    <h1>Friends:</h1>
    <ul>
      {props.friends.map((friend, index) => <FriendItem friend={friend} key={friend} />)}
    </ul>
  )
}
module.exports = FriendsList

//Notice that all we've done is essentially created a "private component" just as we would a private function.

//+
//+
//+
//+

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Section 5

/*  Life Cycle Events + Ajax 

React Life Cycle Events 
  Render method in a React component needs to be a pure function. That means it needs to be stateless, 
  it needs to not make any Ajax requests, etc. It should just receive state and props and then render a UI.
  
  1) When a component gets mounted to the DOM and unmounted.
        - component is initialized and added to the DOM (mounting)
        - when the component is removed from the DOM (unmounting)
  2) When a component receives new data.



  1) 
  Establish some default props in our component
    - .defaultProps
  Set some initial state in our component
    - us constructor (props) { super (props); this.state = {...}}
    - update state by calling this.setState by passing in a function 
  Make an Ajax request to fetch some data needed for this component
    - componentDidMount () {return axios.get(this.props.url).then(this.props.callback)}
  Set up any listeners (ie Websockets or Firebase listeners)
    - ref.on('value', function () {this.setState(function () { return{...}})}
  Remove any listeners you initially set up (when unmounted)
    - ref.off()

https://d2vvqscadf4c1f.cloudfront.net/RXZidTc7S5WEicK3fiNW_Screen%20Shot%202016-02-25%20at%2012.06.29%20PM.png

#You should usually use componentDidMount over componentWillMount

Popular.js

//+
//+
//+
//+

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Section 6

/* Intro to React Router V4

  -Components are the heart of React's powerful, declarative programming model. 
  -React Router is a collection of navigational components that 
   compose declaratively with your application. 
Basic example */

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample/*

  - Dynamic Routing, different then static routing

Lets look at some differences in Express, Ember, Angular...
In these frameworks, you declare your routes as part of your app’s 
initialization before any rendering takes place.

Express: 
  app.get('/', handleIndex)
  app.get('/invoices', handleInvoices)
  app.get('/invoices/:id', handleInvoice)
  app.get('/invoices/:id/edit', handleInvoiceEdit)

  app.listen()   // NOTE: routes are declared before the app listens


Ember:
  Ember has a conventional routes.js file that the build reads and imports into the application for you. 
  Again, this happens before your app renders. 
    Router.map(function() {
      this.route('about');
      this.route('contact');
      this.route('rentals', function() {
        this.route('show', { path: '/:rental_id' });
      });
    });
      
    export defualt Router

 ^^^ all "static routes"

 React Router is not. ---------------
  https://reacttraining.com/react-router/web/guides/philosophy
 When we say dynamic routing, we mean routing that takes place as your app is rendering, 
 not in a configuration or convention outside of a running app. 
 That means almost everything is a component in React Router. */


//First, grab yourself a Router component for the environment you’re targeting and render it at the top of your app.
// react-native
import { NativeRouter } from 'react-router-native'

// react-dom (what we'll use here)
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), el)
// Next, grab the link component to link to a new location:
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
)
//Finally, render a Route to show some UI when the user visits /dashboard.
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard}/>
    </div>
  </div>
)
//The Route will render <Dashboard {...props}/> where props are some router specific things that look like 
//{ match, location, history }. If the user is not at /dashboard then the Route will render null. That’s pretty much all there is to it.

//Nested Routes
const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/tacos" component={Tacos}/>
    </div>
  </BrowserRouter>
)

// when the url matches `/tacos` this component renders
const Tacos  = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route
      path={match.url + '/carnitas'}
      component={Carnitas}
    />
  </div>
)







































