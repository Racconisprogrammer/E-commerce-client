import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useSearchParams} from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import { updatePayment } from '../../../State/Payment/Action';
import { Alert, AlertTitle, Grid } from '@mui/material';
import OrderTracker from '../Order/OrderTracker';
import AddressCard from '../AddressCard/AddressCard';
import {API_BASE_URL} from "../../../config/apiConfig";

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState();
    const [razorpayPaymentId, setRazorpayPaymentId] = useState();
    const [razorpayPaymentLinkReferenceId, setRazorpayPaymentLinkReferenceId] = useState();
    const [razorpayPaymentLinkStatus, setRazorpayPaymentLinkStatus] = useState();
    const [razorpayPaymentLinkId, setRazorpayPaymentLinkId] = useState();
    const {orderId} = useParams();
    const dispatch = useDispatch();
    const {order} = useSelector(store=>store);
    const [imageSrcs, setImageSrcs] = useState({});



    const handleImageLoad = (id) => {
        fetch(`${API_BASE_URL}/images/${id}`)
            .then(response => {
                const fileName = response.headers.get('fileName');
                return response.blob().then(blob => {
                    const src = URL.createObjectURL(blob);
                    setImageSrcs(prevState => ({ ...prevState, [id]: { src, fileName } }));
                });
            });
    };


    useEffect(()=> {
        const urlParam = new URLSearchParams(window.location.search);
        setPaymentId(urlParam.get("razorpay_payment_id"))
        setRazorpayPaymentId(urlParam.get("razorpay_payment_id"))
        setRazorpayPaymentLinkReferenceId(urlParam.get("razorpay_payment_link_reference_id"))
        setRazorpayPaymentLinkStatus(urlParam.get("razorpay_payment_link_status"))
        setRazorpayPaymentLinkId(urlParam.get("razorpay_payment_link_id"))

    }, [])

    useEffect(()=> {
        dispatch(getOrderById(orderId));
        if (paymentId) {
            const data = {paymentId, razorpayPaymentId, razorpayPaymentLinkReferenceId, razorpayPaymentLinkStatus, razorpayPaymentLinkId};

            dispatch(updatePayment(orderId,data))
    }

    }, [orderId, paymentId])


    useEffect(() => {
        order.order?.orderItems.map((item)=>item?.product?.images?.forEach(items => handleImageLoad(items.id)));
    }, [order.order]);


    return (
    <div className='px-2 lg:px-36'>
        <div className='flex flex-col justify-center items-center'>
            <Alert
            variant='filled'
            severity='success'
            sx={{mb:6, width:"fit-content"}}
            >
                <AlertTitle>Payment Success</AlertTitle>
                Congrulation Your Order Get Placed
            </Alert>
        </div>
        <OrderTracker key={order.order?.orderStatus} activeStep={order.order?.orderStatus}/>

        <Grid container className='space-y-5 py-5 pt-20'>
            {order && order.order && order.order.orderItems.length > 0 ? (
                order.order?.orderItems.map((item) => (
                    <Grid container item className='shadow-xl rounded-md p-5'
                          sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                        <Grid item xs={6}>
                            <div className='flex items-center'>
                                    {item?.product?.images?.[0] && (
                                        <img
                                            src={imageSrcs[item?.product?.images[0]?.id]?.src}
                                            alt={imageSrcs[item?.product?.images[0]?.id]?.fileName}
                                            className="w-[5rem] h-[5rem] object-cover object-top"
                                        />
                                    )}
                                <div className='ml-5 space-y-2'>
                                    <p>{item.product.title}</p>
                                    <div className='opacity-50 text-xs font-semibold space-x-5'>
                                        <span>Color: {item.product.color}</span>
                                    </div>
                                    <p>Seller: {item.product.brand}</p>
                                    <p>${item.price}</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <AddressCard address={order.order?.shippingAddress} />
                        </Grid>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div>There is no such order</div>
                </Grid>
            )}
        </Grid>
    </div>
  )
}

export default PaymentSuccess