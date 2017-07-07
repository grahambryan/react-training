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










