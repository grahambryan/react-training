/* initial state with constructor
bind component - update language always in the correct context
create a list item for each array item - map over it
updates state based on click - running update language
*/

var React = require('react');
var PropTypes = require('prop-types')
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

//check prop types in select language
SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}

//Popular page component
class Popular extends React.Component {
	//constructor
	constructor (props) {
		super(props);
		this.state = {
			selectedLanguage: 'All', //default
		};

		this.updateLanguage = this.updateLanguage.bind(this); // takes in a context, and return a new funciton with this bound to whatever is bound from what is passed in
	}

	//update user language selection function - has state
	updateLanguage(lang) {
		this.setState(function () {
			return {
				selectedLanguage: lang,
			}
		});
	}

	//Popular render method
	render() {
		return (
			<div>
				<SelectLanguage
					selectedLanguage = {this.state.selectedLanguage}
					onSelect = {this.updateLanguage}
				/>
				<p> language selected: {this.state.selectedLanguage} </p>
				<p> Hello Nathan, what is up????? </p> 
				<p> Hello Nathan, what is up????? </p> 
			</div>
		)
	}
}

module.exports = Popular;