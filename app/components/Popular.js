/* initial state with constructor
bind component - update language always in the correct context
create a list item for each array item - map over it
updates state based on click - running update language
*/

var React = require('react');;
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

//select language component - takes in props and renders some UI - stateless functional component 
function SelectLanguage (props) {
	var languages = ['All', 'JavaScript', 'Ruby', 'Python', 'CSS', 'Java']; //props
	return (
		<ul className='languages'>
		  {languages.map(function (lang) {
		  	return (
			  <li 
			    style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
				onClick={props.onSelect.bind(null, lang)}
				key={lang}>
				{lang}
			  </li>
			)
		  })} 
		</ul>
	)
}


function RepoGrid (props) {
  return (
  	<ul className='popular-list'>
  	  {props.repos.map(function(repo, index) {
  	  	return (
  	    <li key={repo.name} className="popular-item">
  	      <div className="popular-rank">#{index + 1}</div>
  	      <ul className='space-list-items'>
  	        <li>
  	          <img
  	            className='avatar'
  	            src={repo.owner.avatar_url}
  	            alt={'Avatar for ' + repo.owner.login}
  	          />
  	        </li>
  	        <li><a href={repo.html_url}>{repo.name}</a></li>
  	        <li>@{repo.owner.login}</li>
  	        <li>{repo.stargazers_count} stars</li>
  	      </ul>
  	    </li> 
  	    )
      })}
  	</ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}


//check prop types in select language
SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}



//Popular page component
class Popular extends React.Component {
	//constructor
	constructor (props) {
		super();
		this.state = {
			selectedLanguage: 'All', //default
			repos: null,
		};

		this.updateLanguage = this.updateLanguage.bind(this); // takes in a context, and return a new funciton with this bound to whatever is bound from what is passed in
	}

	componentDidMount() {
	  this.updateLanguage(this.state.selectedLanguage)
	}

	//update user language selection function - has state
	updateLanguage(lang) {
		this.setState(function () {
			return {
				selectedLanguage: lang,
				repos: null,
			}
		});

		api.fetchPopularRepos(lang)
		  .then(function (repos) { //created a new funciton so have to have the .bind property 
		  	this.setState(function () {
		  	  return {
		  	  	repos: repos
		  	  }
		  	});
		  }.bind(this));
	}

	//Popular render method
	render() {
		return (
			<div>
				<SelectLanguage
					selectedLanguage = {this.state.selectedLanguage}
					onSelect = {this.updateLanguage}
				/>
				{!this.state.repos
				  ? <Loading text="DOWNLOADING" />
				  : <RepoGrid repos={this.state.repos} />}
			</div>
		)
	}
}

module.exports = Popular;