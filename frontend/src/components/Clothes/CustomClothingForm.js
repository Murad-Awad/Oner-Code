import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addClothes} from '../../actions/clothes'

class CustomClothingForm extends React.Component {
	state = {
		name: '',
		price: '',
		quantity: '',
		image: null,
	}
	static propTypes = {
		addClothes: PropTypes.func.isRequired
	}
	onChange = e => this.setState({[e.target.name] : e.target.value});
	imageChange = e => this.setState({image: e.target.files[0]})
	onSubmit = e => {
		e.preventDefault()
		// console.log("submit")
		let form_data = new FormData();
		if (this.state.image != null){
			form_data.append('image', this.state.image, this.state.image.name);
		}
    	form_data.append('name', this.state.name);
    	form_data.append('price', this.state.price);
    	form_data.append('quantity', this.state.quantity);
		this.props.addClothes(form_data);
	}
	render() {
		const {name, price, quantity, image} = this.state
		return (
		<div className="card card-body mt-4 mb-4">
	        <h2>Add Custom Clothes</h2>
	        <form onSubmit={this.onSubmit}>
	          <div className="form-group">
	            <label>Name</label>
	            <input
	              className="form-control"
	              type="text"
	              name="name"
	              onChange={this.onChange}
	              value={name}
	            />
	          </div>
	          <div className="form-group">
	            <label>Price</label>
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
				<label htmlFor="exampleFormControlFile1">Upload Image</label>
    			<input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={this.imageChange}/>
	          </div>
	          <div className="form-group">
	            <button type="submit" className="btn btn-primary">
	              Submit
	            </button>
	          </div>
	        </form>
      </div>
		);
	}
}
export default connect(null, {addClothes})(CustomClothingForm);
