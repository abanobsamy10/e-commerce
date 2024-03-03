import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner';

const AllOrders = () => {
    const id = jwtDecode(localStorage.getItem("tkn")).id;
    let [alldata, setAllData] = useState(null)
    async function getAllOrders() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            setAllData(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(function () { getAllOrders() } , [])
    return (<>
        <div className='container py-5'>
            <div className="row g-3">
                {alldata ? alldata.map((order, idx) => <div key={idx} className="col-md-6">
                    <div className="inner p-3 bg-info rounded-2">
                        <p>payment Method Type : {order.paymentMethodType}</p>
                        <p>phone is : {order.shippingAddress.phone}</p>
                        <p>City is : {order.shippingAddress.city}</p>
                        <p>details is : {order.shippingAddress.details}</p>
                        <div className="row">
                            {order.cartItems.map(item=>                    
                            <div className="col-md-4">
                        <div>
                            <img src={item.product.imageCover} className='w-100' alt="" />
                            <h6>{item.product.title.split(" ").slice(0,2).join(" ")}</h6>
                        </div>
                    </div>)}
                    </div>
                    </div>

                </div>)
                    :
                    <div className='vh-100 d-flex justify-content-center align-items-center'>
                        <DNA
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"

                        />
                    </div>}
            </div>
        </div>
    </>
    );
}

export default AllOrders;
