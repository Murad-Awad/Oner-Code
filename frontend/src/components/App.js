import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header'
import Dashboard from './Clothes/Dashboard'
import {Provider} from 'react-redux';
import store from '../store';
import PoshmarkAPI from './Clothes/PoshmarkWebScraping/poshmark'

class App extends Component {
	render() {
		return (
      <Provider store = {store} >
  			<Fragment>
  				<Header />
  				<div className="container">
  					<Dashboard />
  				</div>
  			</Fragment>
      </Provider>
		);
	}



	// async componentDidMount() {
	// 	// const wait = await fetch("https://cse.google.com/cse.js?cx=011620595250338818134:gnjrxsh4vgi");
	// 	const script = document.createElement('script')
 //    script.type = 'text/javascript'
 //    script.async = true
 //    script.src = "https://cse.google.com/cse.js?cx=011620595250338818134:gnjrxsh4vgi"
 //    const el = document.getElementsByTagName('script')[0]
 //    el.parentNode.insertBefore(script, el)
 //  	window.onload = function() {
 //      myFunction()
 //    };
 //  	const search = document.getElementById("searchBar");
 //  	if (search != null) {
 //  		search.enableAutoComplete = "true"
 //  		console.log(search.enableAutoComplete)
 //  	}
 //  	function myFunction() {
 //  		var textInput = document.getElementsByName('search')[0];
 //  		// Gets inputted search data when user presses on search button
 //  		var searchButton = document.getElementsByClassName('gsc-search-button gsc-search-button-v2')[0];
 //  		if (searchButton != null) {
 //          searchButton.onclick = function () {
 //          var text = getTextData()
 //          query(text)
 //        }
 //  		}

 //    	function getTextData(){
 //    		if (textInput != null)
 //    			return textInput.value
 //        else
 //          return null
 //    	}

 //    	// Gets inputted search data when user presses 'enter' on text box
 //    	textInput.onkeydown = function(key) {
 //    		if (!key) 
 //    		key = window.event
 //    		var keyCode = key.keyCode || key.which
 //    		if (keyCode == '13') {
 //    			var text = getTextData()
 //          query(text)
 //          //remove gsc_overflow thing
 //        }
 //    	}
 //      // function callback(mutationsList, observer) {
 //      //   console.log('Mutations:', mutationsList)
 //      //   console.log('Observer:', observer)
 //      // }
 //      // const bodyClassListener = new MutationObserver(callback)
 //      // var body = document.getElementsByTagName('BODY')[0]
 //      // bodyClassListener.observe(
 //      //     body, 
 //      //     {attributes: true}
 //      // )

 //      // function callback(mutationsList) {
 //      //   mutationsList.forEach(mutation => {
 //      //     if (mutation.attributeName == 'class' && (mutation.target.className != '' || mutation.target.className == null)){
 //      //       mutation.target.className = ''
 //      //     }
 //      //   })
 //      // }
 //      //remove gsc results component
 //      var gsc_results = document.getElementsByClassName('gsc-results-wrapper-overlay')[0]
 //      gsc_results.remove()
 //      var searchImage = document.getElementsByClassName('gsc-modal-background-image')[0]
 //      searchImage.remove()
 //    }

 //  	// await poshmark.login()
 //    function query(text) {
 //      //bring in poshmarkApi
 //      var poshmark = new PoshmarkAPI();
 //      console.log('querying')
 //      poshmark.query(text)
 //    }

	// }
}

ReactDOM.render(<App />, document.getElementById('app'));