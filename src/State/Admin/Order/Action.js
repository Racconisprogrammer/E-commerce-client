import async from "async";
import {api, API_BASE_URL} from "../../../config/apiConfig";
import {
    CANCELED_ORDER_FAILURE,
    CANCELED_ORDER_REQUEST,
    CANCELED_ORDER_SUCCESS,
    CONFIRMED_ORDER_FAILURE,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS, FIND_ALL_PRODUCTS_FAILURE,
    FIND_ALL_PRODUCTS_REQUEST, FIND_ALL_PRODUCTS_SUCCESS,
    GET_HISTORY_ORDERS_FAILURE,
    GET_HISTORY_ORDERS_REQUEST,
    GET_HISTORY_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    SHIP_ORDER_FAILURE,
    SHIP_ORDER_REQUEST,
    SHIP_ORDER_SUCCESS
} from "./ActionType";


export const findAllProducts = (name) => async (dispatch) => {
    dispatch({ type: FIND_ALL_PRODUCTS_REQUEST });

    try {
        const  {data}  = await api.get(`${API_BASE_URL}/api/products/all?categoryName=${name}`);

        dispatch({type:FIND_ALL_PRODUCTS_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:FIND_ALL_PRODUCTS_FAILURE, payload:error.message})
    }
};


export const getOrders = () => {
    return async (dispatch) => {
        dispatch({type:GET_ORDERS_REQUEST});
        try {
            const response = await api.get(`${API_BASE_URL}/api/admin/orders/`)
            dispatch({type:GET_ORDERS_SUCCESS, payload:response.data})
        } catch (error) {
            dispatch({type:GET_ORDERS_FAILURE, error:error.message})
        }
    };
};

export const getHistoryOrders = () => {
    return async (dispatch) => {
        dispatch({type:GET_HISTORY_ORDERS_REQUEST});
        try {
            const response = await api.get(`${API_BASE_URL}/api/admin/orders/orderHistory/`)
            dispatch({type:GET_HISTORY_ORDERS_SUCCESS, payload:response.data})
            console.log("get ")
        } catch (error) {
            dispatch({type:GET_HISTORY_ORDERS_FAILURE, error:error.message})
        }
    };
};

export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({type:CONFIRMED_ORDER_REQUEST})

    try {
        const response = await api.put(
            `${API_BASE_URL}/api/admin/orders/${orderId}/confirmed`);
        const data = response.data;
        dispatch({type:CONFIRMED_ORDER_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:CONFIRMED_ORDER_FAILURE, payload:error.message})
    }
};

export const shipOrder = (orderId) => async (dispatch) => {

    dispatch({type:SHIP_ORDER_REQUEST})

    try {
        const {data} = await api.put(`${API_BASE_URL}/api/admin/orders/${orderId}/ship`)
        dispatch({type:SHIP_ORDER_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:SHIP_ORDER_FAILURE, payload:error.message})
    }
}

export const deliveredOrder = (orderId) => async (dispatch) => {

    dispatch({type:DELIVERED_ORDER_REQUEST})

    try {
        const {data} = await api.put(`${API_BASE_URL}/api/admin/orders/${orderId}/deliver`)
        dispatch({type:DELIVERED_ORDER_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:DELIVERED_ORDER_FAILURE, payload:error.message})
    }
}

export const cancelOrder = (orderId) => async (dispatch) => {

    dispatch({type:CANCELED_ORDER_REQUEST})

    try {
        const {data} = await api.put(`${API_BASE_URL}/api/admin/orders/${orderId}/cancel`)
        dispatch({type:CANCELED_ORDER_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:CANCELED_ORDER_FAILURE, payload:error.message})
    }
}
export const deleteOrder = (orderId) => async (dispatch) => {

    dispatch({type:DELETE_ORDER_REQUEST})

    try {
        const {data} = await api.delete(`${API_BASE_URL}/api/admin/orders/${orderId}/delete`)
        dispatch({type:DELETE_ORDER_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:DELETE_ORDER_FAILURE, payload:error.message})
    }
}

