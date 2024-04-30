import React, {useEffect} from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { mens_kurta } from "../../../Data/Men/men_kurta";
import {useDispatch, useSelector} from "react-redux";
import {findAllProducts} from "../../../State/Product/Action";


export const HomePage = () => {
    const {products} = useSelector(store => store.products);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(findAllProducts("mens_kurta"))
    }, []);


  return (
    <><div>
      <MainCarousel />
    </div>
    <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        <HomeSectionCarousel data={products.filter(item => item.category.name === "mens_kurta")} sectionName={"Men's Kurta"} />
        <HomeSectionCarousel data={products.filter(item => item.category.name === "Bluetooth Headphones")} sectionName={"Bluetooth Headphones"} />
        <HomeSectionCarousel data={products.filter(item => item.category.name === "mens_kurta")} sectionName={"Men's Shirt"} />
        <HomeSectionCarousel data={products.filter(item => item.category.name === "mens_kurta")} sectionName={"Women's Saree"} />
        <HomeSectionCarousel data={products.filter(item => item.category.name === "mens_kurta")} sectionName={"Women's Dress"} />
      </div></>
  )
}
