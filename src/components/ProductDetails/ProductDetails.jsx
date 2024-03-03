import axios from 'axios';
import React, { useContext, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../Context/Cart/Cart.js';
import toast from 'react-hot-toast';
const ProductDetails = () => {
    const { AddProductToCart } = useContext(cartContext)
    const [loading, setloading] = useState(false)
    let { id } = useParams()
    async function addProduct(id) {
        setloading(true)
        const res = await AddProductToCart(id)
        if (res.status === "success") {
            toast.success(res.message, { duration: 2000 })
        } else {
            toast.error(res.message, { duration: 2000 })
        }
        setloading(false)
    }
    async function getProductDetails() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let { data, isloading } = useQuery("productDetails", getProductDetails)
    if (isloading === true) {
        return <>
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </>
    }
    return (
        <div className='container my-5'>
            <div className="row d-flex align-items-center">
                <div className="col-md-4">
                    <img src={data?.data.data.imageCover} className='w-100' alt="" />
                </div>
                <div className="col-md-8">
                    <h1>{data?.data.data.title}</h1>
                    <p>{data?.data.data.description}</p>
                    <h6>{data?.data.data.category.name}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p>{data?.data.data.price}EGP</p>
                        <p><span><i className='fa-solid fa-star text-warning'></i></span>{data?.data.data.ratingsAverage}</p>
                    </div>
                    <button onClick={function () { addProduct(data?.data.data.id); }} className='btn btn-success w-100'>{loading ? <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> : "+ADD TO CART"}   </button>
                </div>
            </div>
        </div>
    );
}
export default ProductDetails;
