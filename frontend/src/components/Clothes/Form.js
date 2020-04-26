import React, {Fragment} from 'react';
import store from '../../store';
import {Provider} from 'react-redux';
import PoshmarkAPI from './PoshmarkWebScraping/poshmark';
import {searchClothes, addClothes} from '../../actions/clothes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ClothingInfo from './ClothingInfo'

const style = {
	position: 'relative',
	height: '200px',
	overflow: 'auto',
	display: 'block',
};

class Form extends React.Component {
	constructor(props) {
    super(props)

    this.viewHandler = this.viewHandler.bind(this)
  }

	state = {
		name: '',
		price: '',
		quantity: '',
		image: null,
		link: '',
		popup: false,
		loading: false
	}
	static propTypes = {
		queriedClothes: PropTypes.array.isRequired,
		searchClothes: PropTypes.func.isRequired,
		addClothes: PropTypes.func.isRequired,
	}

	viewDetails(clothing) {
		this.setState({ 
					name : clothing.name,
					price: clothing.lowest_ask_price,
					img: clothing.img,
					link: clothing.href,
					popup: true
		});
	}
	
	viewHandler(){
		this.setState({
			popup: !this.state.popup
		})
	}

	
	render() {
		const {name, price, quantity, image, popup} = this.state
		return (
			<Fragment>
				<h1 align = 'center'>Add Clothes</h1>
				{this.state.popup ? <ClothingInfo clothingData={this.state} viewHandler = {this.viewHandler.bind(this)} visible={this.state.popup}/> : null}
				<div>
					<div className="gcse-search" id = "searchBar" ></div>
				</div>
				<div className="searchResults" style={style}>
				<table className="table table-striped">
					<thead> 
						<tr>
							<th>Name</th>
							<th>Lowest Asking Price</th>
							<th>Image</th>
							<th />
						</tr>
					</thead>
					<tbody style= {{overflow: 'auto', height: 'inherit'}}>
					{ this.state.loading && this.props.queriedClothes.length > 0 ? this.props.queriedClothes.map(clothing => (
						<tr key = {clothing.name} className = 'clickable-row' data-href={'/api/getData/?q' + clothing.href}>
							<td> {clothing.name} </td>
							<td> {clothing.lowest_ask_price} </td>
							<td> <img src={clothing.img} width="123px"></img> </td>
							<td>
								<button onClick = {() => this.viewDetails(clothing)} className="btn btn-primary btn-sn">Add to Closet</button>
							</td>
						</tr>
					)) : this.state.loading ? "LOADING..." : null}
					</tbody>
				</table>
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
				this.setState({loading : true})
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
	    		this.setState({loading : true})
	          //remove gsc_overflow thing
	        }
	    }
		
		var gsc_results = document.getElementsByClassName('gsc-results-wrapper-overlay')[0]
	    gsc_results.remove()
	    var searchImage = document.getElementsByClassName('gsc-modal-background-image')[0]
	    searchImage.remove()
	}
	
	async componentDidMount() {
		const script = document.createElement('script')
	    script.type = 'text/javascript'
	    script.async = true
	    script.src = "https://cse.google.com/cse.js?cx=011620595250338818134:gnjrxsh4vgi"
	    const el = document.getElementsByTagName('script')[0]
	    el.parentNode.insertBefore(script, el)
	  	window.addEventListener('load', this.load)
	}

	componentWillUnmount() {
		window.removeEventListener('load', this.load)  
	}

}

const mapStateToProps = state => ({
	queriedClothes: state.clothesReducer.queriedClothes
})

export default connect(mapStateToProps, {searchClothes, addClothes})(Form);