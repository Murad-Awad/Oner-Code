import React, {Fragment} from 'react';
import Form from './Form';
import Clothes from './Clothes';
import CustomClothingForm from './CustomClothingForm'

export default function Dashboard() {
	return (
		<Fragment>
			<CustomClothingForm />
			<Form />
			<Clothes />
		</Fragment>
	);
}
