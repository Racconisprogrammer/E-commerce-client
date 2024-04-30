import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouselData } from './MainCarouselData';


const items = mainCarouselData.map((item)=> <img className='cursor-pointer -z-20 w-[1920px] h-[800px]'
    role='presentation' src={item.image} alt='' />)

const MainCarousel = () => (
    <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        infinite
    />
);

export default MainCarousel;