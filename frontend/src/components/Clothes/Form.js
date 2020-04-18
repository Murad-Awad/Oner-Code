import React, {Fragment} from 'react';

export default class Form extends React.Component {
	state = {
		name: '',
		price: '',
		quantity: '',
		image: '',
	}
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
}
