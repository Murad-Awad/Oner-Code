import React, {Fragment} from 'react';
import store from '../../store';
import {Provider} from 'react-redux';
import PoshmarkAPI from './PoshmarkWebScraping/poshmark';
import {searchClothes, addClothes} from '../../actions/clothes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Form extends React.Component {
	state = {
		name: '',
		price: '',
		quantity: '',
		image: '',
	}
	static propTypes = {
		// queriedClothes: PropTypes.array.isRequired,
		searchClothes: PropTypes.func.isRequired,
		addClothes: PropTypes.func.isRequired,
	}
	// query = e => {
	// 	console.log('querying')
	// 	// poshmark.query(text)
	// 	var textInput = document.getElementsByName('search')[0];
	// 	queryText = textInput != null ? textInput.value : ""
	// 	this.props.searchClothes(text)
	// }
	render() {
		const {name, price, quantity, image} = this.state
		return (
			<Fragment>
				<h1 align = 'center'>Add Clothes</h1>
				<div>
					<div className="gcse-search" id = "searchBar" ></div>
				</div>
			</Fragment>
		);
	}

	load = () => {
		var textInput = document.getElementsByName('search')[0];
	  	const search = document.getElementById("searchBar")
		if (search != null) {
	  		search.enableAutoComplete = "true"
	  	}
	  	function getTextData(){
	  		var textInput = document.getElementsByName('search')[0];
			var queryText = textInput != null ? textInput.value : ""
			return queryText
	  	}
	  	var textInput = document.getElementsByName('search')[0];
	  	// Gets inputted search data when user presses on search button
	  	var searchButton = document.getElementsByClassName('gsc-search-button gsc-search-button-v2')[0];

	  	if (searchButton != null) {
	        searchButton.onclick = () => {
				var text = getTextData()
				console.log(text)
				this.props.searchClothes(text)
	        }
	  	}
		textInput.onkeydown = (key) => {
	    	if (!key) 
	    		key = window.event
	    	var keyCode = key.keyCode || key.which
	    	if (keyCode == '13') {
	    		var text = getTextData()
	    		console.log(text)
	    		this.props.searchClothes(text)
	          //remove gsc_overflow thing
	        }
	    }
		
		var gsc_results = document.getElementsByClassName('gsc-results-wrapper-overlay')[0]
	    gsc_results.remove()
	    var searchImage = document.getElementsByClassName('gsc-modal-background-image')[0]
	    searchImage.remove()
	}
	
	async componentDidMount() {
		// const wait = await fetch("https://cse.google.com/cse.js?cx=011620595250338818134:gnjrxsh4vgi");
		const script = document.createElement('script')
	    script.type = 'text/javascript'
	    script.async = true
	    script.src = "https://cse.google.com/cse.js?cx=011620595250338818134:gnjrxsh4vgi"
	    const el = document.getElementsByTagName('script')[0]
	    el.parentNode.insertBefore(script, el)
	  // 	window.onload = function() {
	  // 		var textInput = document.getElementsByName('search')[0];
	  // 		const search = document.getElementById("searchBar")
			// if (search != null) {
	  // 			search.enableAutoComplete = "true"
	  // 		}
	  // 		Form.props.searchClothes("hello")

	  //   };
	  // 	var textInput = document.getElementsByName('search')[0];
	  // 	console.log(textInput)
	  	window.addEventListener('load', this.load)

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
	 //          // searchButton.onclick = this.query
	 //          // var text = getTextData()
	 //          // this.query(text)
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
	 //    			// var text = getTextData()
	 //       //    this.query(text)
	 //       			// this.query
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
		// // function query(text) {
		// //   	//bring in poshmarkApi
		// //     // var poshmark = new PoshmarkAPI();
		// //     console.log('querying')
		// //     // poshmark.query(text)
		// //     this.props.searchClothes(text)
		// // }
	    // }

	  	// await poshmark.login()
	}

	componentWillUnmount() {
		window.removeEventListener('load', this.load)  
	}

}

const mapStateToProps = state => ({
	// queriedClothes: state.clothesReducer.queriedClothes
})

export default connect(mapStateToProps, {searchClothes, addClothes})(Form);