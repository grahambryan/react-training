/* initial state with constructor
bind component - update language always in the correct context
create a list item for each array item - map over it
updates state based on click - running update language
*/

var React = require('react');


class Popular extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selectedLanguage: 'All', //default
		};

		this.updateLanguage = this.updateLanguage.bind(this); // takes in a context, and return a new funciton with this bound to whatever is bound from what is passed in
	}

	updateLanguage(lang) {
		this.setState(function () {
			return {
				selectedLanguage: lang,
			}
		});
	}
	render() {
		var languages = ['All', 'JavaScript', 'Ruby', 'Python', 'CSS', 'Java'];
		
		return (
			<ul className='languages'>
				{languages.map(function (lang) {
					return (
						<li 
							style={lang === this.state.selectedLanguage ? {color: '#d0021b'} : null}
							onClick={this.updateLanguage.bind(null, lang)} //now this key word will be the same as the above this // returns new function
							key={lang}>
							{lang}
						</li>
					)
				}, this)} 
			</ul>
		)
	}
}

module.exports = Popular;