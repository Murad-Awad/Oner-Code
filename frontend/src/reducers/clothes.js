import {GET_CLOTHES, DELETE_CLOTHES, ADD_CLOTHES} from '../actions/types.js'

const initialState = {
	clothes : []
}

export default function (state = initialState, action) {
	switch(action.type) {
		case GET_CLOTHES:
			return {
				...state,
				clothes: action.payload
			};
		case DELETE_CLOTHES:
			return {
				...state,
				clothes: state.clothes.filter(clothes => clothes.id != action.payload)
			};
		case ADD_CLOTHES:
			return {
				...state,
				clothes: [...state.clothes, action.payload]
			};
	default:
		return state

	}
}
