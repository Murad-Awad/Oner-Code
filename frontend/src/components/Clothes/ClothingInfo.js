import React, {Fragment} from 'react';
import './ClothingInfo.css';  
import {searchClothes, addClothes} from '../../actions/clothes';
import store from '../../store';
import {Provider} from 'react-redux';
import PoshmarkAPI from './PoshmarkWebScraping/poshmark';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Modal from 'react-awesome-modal';

class ClothingInfo extends React.Component {  
	state = {
		name: this.props.clothingData.name,
		price: parseInt(this.props.clothingData.price.substring(1)),
		quantity: '',
		image: this.props.clothingData.img,
		link: this.props.clothingData.href,
		popup: false,
	}
	static propTypes = {
		queriedClothes: PropTypes.array.isRequired,
		searchClothes: PropTypes.func.isRequired,
		addClothes: PropTypes.func.isRequired,
	}
	onChange = e => this.setState({[e.target.name] : e.target.value});

	onSubmit = e => {
		e.preventDefault()
		// console.log("submit")
		let form_data = new FormData();
		if (this.state.image != null){
			form_data.append('image_url', this.state.image);
		}
    	form_data.append('name', this.state.name);
    	form_data.append('price', this.state.price);
    	form_data.append('quantity', this.state.quantity);
		this.props.addClothes(form_data);
		this.props.viewHandler();
	}
render() {  
	const {name, price, quantity, image} = this.state  
	return (
	 <section>
            <Modal visible={this.props.visible} width="1000" height="1000" effect="fadeInUp" onClickAway={this.props.viewHandler}>
                <div>
                   <h1>{this.props.clothingData.name}</h1>
                   <img src={this.props.clothingData.img} width="300px"/>
                   <h2>Lowest Ask Price: {this.props.clothingData.price}</h2>
                   <h3>Data Here: </h3>
                   <form onSubmit={this.onSubmit}>
	          				<div className="form-group">
					            <label>Price You Want to Sell For</label>
					            <input
					              className="form-control"
					              type="number"
					              name="price"
					              onChange={this.onChange}
					              value={price}
					            />
					        </div>
	          				<div className="form-group">
	          	            	<label>Quantity</label>
		          	            <textarea
		          	              className="form-control"
		          	              type="number"
		          	              name="quantity"
		          	              onChange={this.onChange}
		          	              value={quantity}
		          	            />
	          				</div>
				            <div className="form-group">
				            	  <button type="submit" className="btn btn-primary">
				                	Add Clothing To Closet
				            	  </button>
				            </div>
	        		</form>
          		</div>
            </Modal>
     </section>
	);  
}  
}

const mapStateToProps = state => ({
	queriedClothes: state.clothesReducer.queriedClothes
})


export default connect(mapStateToProps, {searchClothes, addClothes, getData})(ClothingInfo);