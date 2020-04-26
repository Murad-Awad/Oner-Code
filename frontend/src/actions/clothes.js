import axios from 'axios'

import {GET_CLOTHES, DELETE_CLOTHES, ADD_CLOTHES, SEARCH_CLOTHES} from './types'

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

export const addClothes = (clothing) => dispatch => {
	axios.post('/api/clothes/', clothing, {
      	headers: {
        	'content-type': 'multipart/form-data'
      	}
    })
		.then(res => {
		console.log(res)
		dispatch({
			type: ADD_CLOTHES,
			payload: res.data,
		});
	})
	.catch(err => {
		console.log(err)
		console.log(clothing)
	})
}

export const searchClothes = (query) => dispatch => {
	axios.get('/api/query/?q=' + query)
	.then(res => {
	// console.log(res.data)
	dispatch({
		type: SEARCH_CLOTHES,
		payload: res.data,
	});
	})
	.catch(err => {
		console.log(err)
		console.log(query)
	})
}

