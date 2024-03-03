import React, { useContext } from 'react';
import { WishContext } from '../../Context/Wish/Wish';
import { DNA } from 'react-loader-spinner';
import { cartContext } from '../../Context/Cart/Cart';

const Wish = () => {
    const { products  ,removefromwish} = useContext(WishContext);
    const { AddProductToCart } = useContext(cartContext);
    console.log(products)

    if (products === null) {
        return <div className='vh-100 d-flex justify-content-center align-items-center'>
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="DNA-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    }
    if (products.count === 0) {
        return <div className='vh-100 d-flex justify-content-center align-items-center'>
            <h2>No Data To Display</h2>
        </div>
    }
    return (
        <>
            <div style={{ backgroundColor: "#eee" }} className='py-5 my-5 container'>
                <h1 className='mb-5'>My wish List</h1>
                <div className='row container'>
                    {
                        products?.data.map(function (product, idx) {
                            return <>
                                <div className='border-bottom border-1 py-3  d-flex align-items-center' key={idx} >
                                    <div className="col-md-2 ">
                                    <img src={product.imageCover}className='w-100 '    alt="" />
                                    </div>
                                    <div  className="col-md-8 mx-2 ">
                                        <div>
                                            <h4>{product.title}</h4>
                                            <h6 className='text-success'>{product.price}EGP</h6>
                                            <span onClick ={function(){removefromwish(product._id)}} style={{cursor:"pointer"}} className='text-danger '><i className=' mx-1 fa fa-recycle'></i>Remove</span>
                                        </div>
                                    </div>
                                    <div  className="col-md-2 mx-2 ">
                                        <button id='help' className='w-100 btn btn-light fs-5' onClick={function(){AddProductToCart(product._id)}}>Add To Cart</button>
                                    </div>
                                </div>
                            </>
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Wish;
