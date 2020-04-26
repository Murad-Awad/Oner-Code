import {GET_CLOTHES, DELETE_CLOTHES, ADD_CLOTHES, SEARCH_CLOTHES} from '../actions/types.js'

const initialState = {
	clothes : [],
	queriedClothes: [],
}

export default function (state = initialState, action) {
	switch(action.type) {
		case GET_CLOTHES:
			return {
				...state,
				clothes: action.payload,
				queriedClothes: state.queriedClothes
			};
		case DELETE_CLOTHES:
			return {
				...state,
				clothes: state.clothes.filter(clothes => clothes.id != action.payload),
				queriedClothes: state.queriedClothes
			};
		case ADD_CLOTHES:
			return {
				...state,
				clothes: [...state.clothes, action.payload],
				queriedClothes: state.queriedClothes
			};
		case SEARCH_CLOTHES:
			return {
				...state,
				clothes: [...state.clothes],
				queriedClothes: action.payload.data.stockX
			}
	default:
		return state

	}
}
