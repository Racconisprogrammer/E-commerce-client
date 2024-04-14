import {api, API_BASE_URL} from "../../config/apiConfig";
import { CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAILURE, UPDATE_PAYMENT_REQUEST, UPDATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_FAILURE} from "./ActionType";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });

  try {
    const { data } = await api.post(`/api/payments/${orderId}`, {});
    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }

    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: CREATE_PAYMENT_FAILURE, 
      payload: error.message,
    });
  }
};

export const updatePayment = (orderId,reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });

  try {
    const { data } = await api.put(`${API_BASE_URL}/api/payments/update/${orderId}`, reqData);
    
    if (data.razorpayPaymentLinkId) {
      window.location.href = data.razorpayPaymentLinkId;
    }

    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: UPDATE_PAYMENT_FAILURE,
      payload: error.message,
    });
  }
};

