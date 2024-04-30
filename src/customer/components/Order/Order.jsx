import { Grid } from '@mui/material'
import React, {useEffect} from 'react'
import OrderCard from './OrderCard'
import {useDispatch, useSelector} from "react-redux";
import {getHistoryOrders} from "../../../State/Order/Action";




const orderStatus = [
    {label:"On The Way", value:"on_the_way"},
    {label:"Delivered", value:"delivered"},
    {label:"Cancelled", value:"cancelled"},
    {label:"Returned", value:"returned"},
]

const stepStatus = [
    "PLACED",
    "DELIVERED",
    "CANCELLED",
    "RETURNED"
]


const Order = () => {
    const dispatch = useDispatch();
    const {order} = useSelector(store=>store);

    useEffect(()=> {
        dispatch(getHistoryOrders());
    }, [dispatch])


    console.log("Order ", order.order?.map((item)=>{
        console.log("1233  ", item)
    }))

    return (
    <div className='px:5 lg:px-20'>

        <Grid container sx={{justifyContent:"space-between"}}>

            <Grid item xs={2.5}>

                <div className='h-auto shadow-lg bg-white p-5 sticky'>
                    <h1 className='font-bold text-lg'>Filter</h1>
                </div>
                <div className='space-y-4 mt-10'>
                    <h1 className='font-semibold'>ORDER STATUS</h1>

                   {orderStatus.map((option)=> <div className='flex items-center'>
                        <input defaultValue={option.value} type="checkbox" className='h-4 w-4 border-gray-300
                         text-indigo-600 focus:ring-indigo-300' />
                         <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
                            {option.label}
                         </label>
                    </div>)}
                </div>

            </Grid>

            <Grid item xs={9}>
                <div className='space-y-5'>
                {order.order?.map((items)=>items.orderItems?.map((item, index)=><OrderCard orderId={items.id} item={item} key={index}/>))}
                </div>

            </Grid>

        </Grid>

    </div>
  )
}

export default Order