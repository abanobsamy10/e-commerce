import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
const CategorySlide = () => {
    var settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
    };
    async function getAllCategory() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    let { data, isloading } = useQuery("category", getAllCategory)
    if (isloading === true) {
        return (<>
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        </>)
    }
    return (
        <Slider {...settings}>
            {data?.data.data.map(function (element,idx) {
                return <div key={idx}>
                        <img style={{ width: "100%", height: "200px" }} className='w-100' src={element.image} alt="" />
                        <h6>{element.name}</h6>
                    </div>
                
            })}
        </Slider>
    );
}
export default CategorySlide;