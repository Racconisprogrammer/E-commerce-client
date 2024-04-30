import React, {useEffect} from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import {useDispatch, useSelector} from "react-redux";
import {findAllProducts} from "../../../State/Product/Action";


export const HomePage = () => {
    const {products} = useSelector(store => store.products);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(findAllProducts("Bluetooth Headphones"))
    }, []);


  return (
    <><div>
      <MainCarousel />
    </div>
    <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        <HomeSectionCarousel data={products.filter(item => item.category.name === "Bluetooth Headphones")} sectionName={"Bluetooth Headphones"} />
        <HomeSectionCarousel data={products.filter(item => item.category.name === "DSLR Mirrorless")} sectionName={"DSLR Mirrorless"} />
        <HomeSectionCarousel data={products.filter(item => item.category.name === "Monitors")} sectionName={"Monitors"} />
        <HomeSectionCarousel data={products.filter(item => item.category.name === "Gaming Keyboards")} sectionName={"Gaming Keyboards"} />
      </div></>
  )
}
