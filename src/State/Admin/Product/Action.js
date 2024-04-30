import {api, API_BASE_URL} from "../../../config/apiConfig";
import {FIND_ALL_PRODUCTS_FAILURE,
    FIND_ALL_PRODUCTS_REQUEST, FIND_ALL_PRODUCTS_SUCCESS
} from "./ActionType";


export const getAllProducts = (name) => async (dispatch) => {
    dispatch({ type: FIND_ALL_PRODUCTS_REQUEST });

    try {
        const  {data}  = await api.get(`${API_BASE_URL}/api/products/all?categoryName=${name}`);

        dispatch({type:FIND_ALL_PRODUCTS_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:FIND_ALL_PRODUCTS_FAILURE, payload:error.message})
    }
};
