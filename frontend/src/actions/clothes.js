import axios from 'axios'

import {GET_CLOTHES, DELETE_CLOTHES} from './types'

//get clothes
//dispatch actions to our reducer
export const getClothes = () => dispatch => {
	axios
		.get('/api/clothes/')
		.then(res => {
		dispatch({
			type: GET_CLOTHES,
			payload: res.data
		})
	})
	.catch(err => console.log(err))
}

//delete clothes

export const deleteClothes = id => dispatch => {
	axios
		.delete(`/api/clothes/${id}/`)
		.then(res => {
		dispatch({
			type: DELETE_CLOTHES,
			payload: id
		})
	})
	.catch(err => console.log(err))
}
