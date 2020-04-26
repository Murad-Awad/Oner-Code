import {GET_CLOTHES, DELETE_CLOTHES, ADD_CLOTHES, SEARCH_CLOTHES, GET_DATA, REFRESH_DATA} from '../actions/types.js'

const initialState = {
	clothes : [],
	queriedClothes: [],
	clothingInfo: []
}

export default function (state = initialState, action) {
	switch(action.type) {
		case GET_CLOTHES:
			return {
				...state,
				clothes: action.payload,
				queriedClothes: state.queriedClothes,
				clothingInfo: state.clothingInfo
			};
		case DELETE_CLOTHES:
			return {
				...state,
				clothes: state.clothes.filter(clothes => clothes.id != action.payload),
				queriedClothes: state.queriedClothes,
				clothingInfo: state.clothingInfo
			};
		case ADD_CLOTHES:
			return {
				...state,
				clothes: [...state.clothes, action.payload],
				queriedClothes: state.queriedClothes,
				clothingInfo: state.clothingInfo
			};
		case SEARCH_CLOTHES:
			return {
				...state,
				clothes: [...state.clothes],
				queriedClothes: action.payload.data.stockX,
				clothingInfo: state.clothingInfo
			}
		case GET_DATA:
			return {
				...state,
				clothes: [...state.clothes],
				queriedClothes: state.queriedClothes,
				clothingInfo: action.payload.data
			}
		case REFRESH_DATA:
			return {
				...state,
				clothes: [...state.clothes],
				queriedClothes: state.queriedClothes,
				clothingInfo: []
			}
	default:
		return state

	}
}
