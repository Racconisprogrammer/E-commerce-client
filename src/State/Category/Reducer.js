import {GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS} from "./ActionType";


const initialState = {
    category: null,
    loading: false,
    error: null,
    categoryParent: [],
};

export const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryParent: action.payload,
                category: action.payload,
                loading: false,
            };
        case GET_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state
    }
}