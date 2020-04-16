import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header'
import Dashboard from './Clothes/Dashboard'

class App extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<div className="container">
					<Dashboard />
				</div>
			</Fragment>
		)
	}
	async componentDidMount() {
		// const wait = await fetch("https://cse.google.com/cse.js?cx=011620595250338818134:gnjrxsh4vgi");
		const script = document.createElement('script')
      	script.type = 'text/javascript'
      	script.async = true
      	script.src = "https://cse.google.com/cse.js?cx=011620595250338818134:gnjrxsh4vgi"
      	const el = document.getElementsByTagName('script')[0]
      	el.parentNode.insertBefore(script, el)
  		window.onload = function() {myFunction()};
  		const search = document.getElementById("searchBar");
  		if (search != null) {
  			search.enableAutoComplete = "true"
  			console.log(search.enableAutoComplete)
  		}
  		function myFunction() {
  			console.log('woot');
  			var textInput = document.getElementsByName('search')[0];
  			// Gets inputted search data when user presses on search button
  			var searchButton = document.getElementsByClassName('gsc-search-button gsc-search-button-v2')[0];
  			if (searchButton != null) {
  				searchButton.onclick = function () {getTextData()}
  			}

  			function getTextData(){
  				if (textInput != null)
  					console.log(textInput.value)
  			}

  			// Gets inputted search data when user presses 'enter' on text box
  			textInput.onkeydown = function(key) {
  				console.log(key) 
  				if (!key) 
  					key = window.event
  				var keyCode = key.keyCode || key.which
  				if (keyCode == '13')
  					getTextData()
  			}
  		}
	}
}

ReactDOM.render(<App />, document.getElementById('app'));