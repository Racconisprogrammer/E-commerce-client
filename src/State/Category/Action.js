
import {api} from "../../config/apiConfig";
import {GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS} from "./ActionType";


export const getCategory = () => async (dispatch) => {
    dispatch({ type: GET_CATEGORY_REQUEST });

    try {
        const { data } = await api.get("/api/category/");
        dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CATEGORY_FAILURE, payload: error.message });
    }
};