import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomeSlider = () => {
    var settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (<>

        <div className="row g-0 mb-5">
            <div className='col-md-9'>
                <Slider {...settings}>
                    <div>
                        <img style={{ width: "100%", height: "400px" }} className='w-100' src={require("../../images/slider-image-1.jpeg")} alt="" />
                    </div>
                    <div>
                        <img style={{ width: "100%", height: "400px" }} className='w-100' src={require("../../images/slider-image-2.jpeg")} alt="" />
                    </div>
                    <div>
                        <img style={{ width: "100%", height: "400px" }} className='w-100' src={require("../../images/slider-image-3.jpeg")} alt="" />
                    </div>
                    <div>
                        <img style={{ width: "100%", height: "400px" }} className='w-100' src={require("../../images/slider-2.jpeg")} alt="" />
                    </div>
                </Slider>
            </div>
            <div className='col-md-3'>
                <img className='w-100' height={"200px"} src={require("../../images/grocery-banner.png")} alt="" />
                <img className='w-100' height={"200px"} src={require("../../images/grocery-banner-2.jpeg")} alt="" />
            </div>

        </div>




    </>);
}

export default HomeSlider;
