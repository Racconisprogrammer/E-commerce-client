import {
    FIND_ALL_PRODUCTS_FAILURE,FIND_ALL_PRODUCTS_SUCCESS,FIND_ALL_PRODUCTS_REQUEST
} from "./ActionType";


const initialState = {
    loading: false,
    producer:[],
    produc:null,
    error:"",
};

const adminProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FIND_ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                producer: action.payload,
                error: ""
            }
        case FIND_ALL_PRODUCTS_FAILURE:
            return {
                loading: false,
                producer: [],
                error: action.payload
            }
        default:
            return state;
    }
}

export default adminProductReducer;