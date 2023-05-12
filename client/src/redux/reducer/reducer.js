import { GET_BY_ID, GET_BY_NAME, GET_DOGS, GET_TEMPERAMENTS } from '../actions/actions-types.js'

const initialState = {

}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_DOGS:
            
            return {
                ...state
            }
        case GET_TEMPERAMENTS:

            return {
                ...state
            }
        case GET_BY_NAME:

            return {
                ...state
            }
        case GET_BY_ID:

            return {
                ...state
            }

        default:
            return { ...state }
    }
}

export default reducer;