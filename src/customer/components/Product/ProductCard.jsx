import React, {useEffect, useState} from 'react'
import "./ProductCard.css"
import { useNavigate } from 'react-router-dom'
import {API_BASE_URL} from "../../../config/apiConfig";


const ProductCard = ({product}) => {
  const navigate = useNavigate();
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

    useEffect(() => {
        product?.images?.forEach(item => handleImageLoad(item.id));
    }, [product]);



    return (
    <div onClick={()=>navigate(`/product/${product.id}`)} className='productCard w-[15rem] m-3 transition-all cursor-pointer'>
        <div className='h-[20rem]'>
                {product?.images?.[0] && (
                    <img
                        src={imageSrcs[product?.images[0]?.id]?.src}
                        alt={imageSrcs[product?.images[0]?.id]?.fileName}
                        className="h-full w-full object-cover object-left-top"
                    />
                )}
        </div>

        <div className='textPart bg-white p-3'>
            <div>
                <p className='font-bold opacity-60'>{product.brand}</p>
                <p>{product.title}</p>
            </div>
            <div className='flex items-center space-x-2'>
              <p className='font-semibold'>{product.discountedPrice}</p>
              <p className='line-through opacity-50'>{product.price}</p>
              <p className='text-green-600 font-semibold'>{product.discountPersent}% off</p>
            </div>

        </div>

    </div>
  )
}

export default ProductCard