var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css'); // css loader in webpack allows this to work 

// to build, run <npm run start>

// 																++++++++ Hello World example

// // state
// // lifecycle event - shown to screen removed from screen ... etc
// // UI of the component - required 

// class App extends React.Component {
// 	render() {
// 		return (
// 			<div>
// 				My First React App!
// 			</div>
// 		)
// 	}
// }

//<App /> how you tell react to use the component in html

// ReactDom.render(
// 	<App />,
// 	document.getElementById('app') //html that has ID #app 
// );

// 															++++++++ .map and .filter example

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
            return <li key={user.name}>{user.name}</li> // would want user.name in key to be unique ussually like UID // could use index, but be careful
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