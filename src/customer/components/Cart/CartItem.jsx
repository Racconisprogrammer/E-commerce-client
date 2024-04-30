import { Button, IconButton } from '@mui/material'
import React, {useEffect, useState} from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useDispatch} from 'react-redux';
import {removeCartItems, updateCartItems} from '../../../State/Cart/Action';
import {API_BASE_URL} from "../../../config/apiConfig";


const CartItem = ({item}) => {
    const [imageSrcs, setImageSrcs] = useState({});


    const handleImageLoad = (id) => {
        console.log("itemm ", id)
        fetch(`${API_BASE_URL}/images/${id}`)
            .then(response => {
                const name = response.headers.get('name');
                return response.blob().then(blob => {
                    const src = URL.createObjectURL(blob);
                    setImageSrcs(prevState => ({ ...prevState, [id]: { src, name } }));
                });
            });
    };


    useEffect(() => {
        item?.product?.images?.forEach(items => handleImageLoad(items.id));
    }, [item]);


    const dispatch = useDispatch();

    const handleUpdateCartItems = (num) => {
        const data = {data:{quantity:item?.quantity+num}, cartItemId:item?.id};
        dispatch(updateCartItems(data))
    }

    const handleRemoveCartItems=()=>{
        dispatch(removeCartItems(item?.id))
    }


    return (
    <div className='p-5 shadow-lg border rounded-md'>

        <div className='flex items-center'>

            <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>

                  {item?.product?.images?.[0] && (
                    <img
                        src={imageSrcs[item?.product?.images[0]?.id]?.src}
                        alt={imageSrcs[item?.product?.images[0]?.id]?.name}
                        className="w-full h-full object-cover object-top"
                    />
                )}

            </div>

            <div className='ml-5 space-y-1'>
                <p className='font-semibold'>{item?.product?.title}</p>
                <p className='opacity-70'>Size: {item?.size}, White</p>
                <p className='opacity-70 mt-2'>Seller: {item?.product?.brand}</p>
                <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 pt-6">
                    { item?.product?.discountPercent > 0 ? <p className="font-semibold">${item?.product?.discountPrice}</p> :
                <p className="opacity-50 line-through">${item?.product?.price}</p>}
                    { item?.product?.discountPercent < 0 ? <p className="font-semibold">${item?.product?.discountPrice}</p> :
                <p className="opacity-50 line-through">${item?.product?.price}</p>}
                <p className="text-green-600 font-semibold">{item?.product?.discountPercent}% Off</p>
              </div>
            </div>


        </div>
            <div className='lg:flex items-center lg:space-x-10 pt-4'>

                <div className='flex items-center space-x-2'>

                    <IconButton onClick={() => handleUpdateCartItems(-1)} disabled={item?.quantity<=1}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className='py-1 px-7 border rounded-sm'>
                    {item?.quantity}
                    </span>

                    <IconButton onClick={() => handleUpdateCartItems(1)} sx={{color:"RGB(145 85 253)"}}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>

                <div>
                    <Button onClick={handleRemoveCartItems} sx={{color:"RGB(145 85 253)"}}>
                        remove
                    </Button>
                </div>

            </div>

    </div>
  )
}

export default CartItem