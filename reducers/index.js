import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions'

function entries(state = {}, action) {
	switch (action.type) {
		case RECEIVE_ENTRIES :
			return {
				...state, // state as is
				...action.entries // merging entries to state above
			}
		case ADD_ENTRY :
			return {
				...state,
				...action.entry
			}
		default :
			return state
	}
}

export default entries