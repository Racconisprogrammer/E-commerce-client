import React, {useEffect} from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrderById} from "../../../State/Order/Action";



const OrderDetails = () => {

    const {orderId} = useParams();
    const dispatch = useDispatch();
    const {order} = useSelector(store => store)

    useEffect(() => {
        dispatch(getOrderById(orderId))
    }, [orderId]);

    console.log("Details ", order.order)

  return (
    <div className='px:5 lg:px-20'>
        <div>
        <h1 className='font-bold text-xl py-10'>Delivery Address</h1>
        <AddressCard address={order.order?.shippingAddress}/>
        </div>
        <div className='py-20'>
            <OrderTracker activeStep={order.order?.orderStatus} key={order.order?.orderStatus} />
        </div>

        <Grid className='space-y-5' container>

            {order.order?.orderItems?.map((item)=> (

                <Grid item container className='shadow-xl rounded-md p-5 border'
                      sx={{alignItems: "center", justifyContent: "space-between"}}>

                    <Grid item xs={6}>

                        <div className='flex items-center space-x-4'>
                            <img className='w-[5rem] h-[5rem] object-cover object-top'
                                 src="https://rukminim1.flixcart.com/image/612/612/k4d27ww0/shirt/q/w/t/l-el024-el-senor-original-imafnadnjp5pq6tg.jpeg?q=70" alt=""/>

                            <div className='space-y-2 ml-5'>
                                <p className='font-semibold'>{item?.product?.title}</p>
                                <p className='space-x-5 opacity-50 text-xs font-semibold'>
                                    <span>Color: {item?.product?.color} </span>
                                    <span>Size: {item?.size}</span>
                                </p>
                                <p>Seller: {item?.product?.brand}</p>
                            </div>

                        </div>

                    </Grid>

                    <Grid item>

                        <Box sx={{color: deepPurple[500]}}>
                            <StarBorderIcon sx={{fontSize: "2rem"}} className='px-2'/>
                            <span>Rate & Review Product</span>
                        </Box>

                    </Grid>

                </Grid>
            ))}
        </Grid>
    </div>
    
    
  )
}

export default OrderDetails