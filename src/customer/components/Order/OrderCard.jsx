import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';


const OrderCard = ({item, orderId}) => {
    const navigate = useNavigate();


  return (
    <div onClick={()=>navigate(`/account/order/${orderId}`)} className='p5 shadow-md shadow-black hover:shadow-2xl border'>

        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>

            <Grid item xs={6}>

                <div className='flex cursor-pointer'>
                    <img className='w-[5rem] h-[5rem] object-cover object-top'
                     src="https://rukminim1.flixcart.com/image/612/612/k4d27ww0/shirt/q/w/t/l-el024-el-senor-original-imafnadnjp5pq6tg.jpeg?q=70" alt="" />
                    <div className='ml-5 space-y-2'>

                        <p className=''>{item?.product?.title}</p>
                        <p className='opacity-50 text-xs font-semibold'>Size: {item?.size}</p>
                        <p className='opacity-50 text-xs font-semibold'>Color: {item?.product?.color}</p>

                    </div>
                </div>

            </Grid>

            <Grid item xs={2}>

                <p>${item?.price}</p>

            </Grid>


            <Grid item xs={4}>
                {item?.deliveryDate !== null && <div>

                <p>
                    <AdjustIcon sx={{width:"15px", height:"15px"}} className='text-green-600 mr-2
                    text-sm' />
                    <span>Delivered on {item?.deliveryDate}</span>
                </p>
                <p className='text-xs'>Your Item Has Been Delivered</p>
                </div>}
                {item?.deliveryDate === null && <p>
                    <span>Delivered on 10-15 days</span>
                </p>}

            </Grid>


        </Grid>

    </div>
  )
}

export default OrderCard