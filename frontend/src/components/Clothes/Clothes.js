import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getClothes, deleteClothes} from '../../actions/clothes'

const style = {
	position: 'relative',
	height: '550px',
	width: '900px',
	overflow: 'auto',
	display: 'block',
};

const styleObj = {
	textAlign: "center"

}

class Clothes extends Component {
	static propTypes = {
		clothes: PropTypes.array.isRequired,
		getClothes: PropTypes.func.isRequired,
		deleteClothes: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.props.getClothes();
	};

	render() {
		return (

       <div className="section-2">
        <div className="w-layout-grid grid-2">
          <div className="w-layout-grid grid-7">
            <div className="clothingResults" style={style}>
            	<h2>Your Closet</h2>
				<table className="table table-striped">
					<thead> 
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Image</th>
							<th />
						</tr>
					</thead>
					<tbody>
					{ this.props.clothes.map(clothing => (
						<tr key = {clothing.id}>
							<td> {clothing.id} </td>
							<td> {clothing.name} </td>
							<td> {clothing.price} </td>
							<td> {clothing.quantity} </td>
							<td> <img src={clothing.image ? clothing.image : clothing.image_url} width="123px"></img> </td>
							<td>
								<button 
								onClick={this.props.deleteClothes.bind(this, clothing.id)}
								className="btn btn-danger btn-sn">Delete</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
				</div>
            </div>
          </div>
        </div>
		);
	};
}

const mapStateToProps = state => ({
	clothes: state.clothesReducer.clothes
})

export default connect(mapStateToProps, {getClothes, deleteClothes})(Clothes);



			// <Fragment>
			// 	<h2 align = 'center'>Your Clothing</h2>
			// 	<div className="clothingResults" style={style}>
			// 	<table className="table table-striped">
			// 		<thead> 
			// 			<tr>
			// 				<th>ID</th>
			// 				<th>Name</th>
			// 				<th>Price</th>
			// 				<th>Quantity</th>
			// 				<th>Image</th>
			// 				<th />
			// 			</tr>
			// 		</thead>
			// 		<tbody>
			// 		{ this.props.clothes.map(clothing => (
			// 			<tr key = {clothing.id}>
			// 				<td> {clothing.id} </td>
			// 				<td> {clothing.name} </td>
			// 				<td> {clothing.price} </td>
			// 				<td> {clothing.quantity} </td>
			// 				<td> <img src={clothing.image ? clothing.image : clothing.image_url} width="123px"></img> </td>
			// 				<td>
			// 					<button 
			// 					onClick={this.props.deleteClothes.bind(this, clothing.id)}
			// 					className="btn btn-danger btn-sn">Delete</button>
			// 				</td>
			// 			</tr>
			// 		))}
			// 		</tbody>
			// 	</table>
			// 	</div>
			// </Fragment>