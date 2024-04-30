import React, {useEffect, useState} from "react";
import {API_BASE_URL} from "../../../config/apiConfig";

const HomeSectionCard = ({product}) => {

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
    <div
      className="
    cursor-pointer
    flex
    flex-col
    items-center
    bg-white
    rounded-lg
    shadow-lg
    overflow-hidden
    w-[15rem]
    mx-3
    border
    "
    >
      <div className="h-[13rem] w-[10rem]">
        {product?.images?.[0] && (
            <img
                src={imageSrcs[product?.images[0]?.id]?.src}
                alt={imageSrcs[product?.images[0]?.id]?.fileName}
                className="object-cover object-top w-full h-full"
            />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500">
          {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
