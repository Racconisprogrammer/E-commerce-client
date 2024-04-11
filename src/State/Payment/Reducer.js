import { CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAILURE, UPDATE_PAYMENT_REQUEST, UPDATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_FAILURE } from "./ActionType"

const initialState = {
    orders:[],
    order:null,
    error:null,
    loading:false,
}


export const paymentReducer = (state=initialState, action) => {


    console.log("Reducer payment ", action.type)
    switch(action.type){
        case CREATE_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false, 
                success: true,
                order: action.payload,
                error: null,
            };
        case CREATE_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;

    }
}