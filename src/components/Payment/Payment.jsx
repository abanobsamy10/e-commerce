import axios from 'axios';
import React, { useContext, useState } from 'react';
import { cartContext } from '../../Context/Cart/Cart';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    let [phone,setPhone] =useState("")
    
    let [city,setCity] =useState("")
    
    let [details,setDetails] =useState("")
    
    let nav=useNavigate()

    const  {cartid,setnumofitem,settotalprice,setproducts}=useContext(cartContext)
    async function cashPayment(e)
    {
        let formData ={
            shippingAddress:{
                details: details,
                phone: phone,
                city: city
                }
        }
        try 
        {
            let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`,formData,{headers:{token:localStorage.getItem("tkn")}})
            if(data.status==="success")
            {
                setnumofitem(0)
                settotalprice(0)
                setproducts([])
                nav("/allorders")
            }
        } 
        catch (error)
        {
            console.log(error);   
        }
    }

    async function onlinePayment(e)
    {
        let formData ={
            shippingAddress:{
                details: details,
                phone: phone,
                city: city
                }
        }
        try 
        {
            let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`,formData,{headers:{token:localStorage.getItem("tkn")},params:{url:"http://localhost:3000"}})
            if(data.status==="success")
            {
                window.open(data.session.url)
                // setnumofitem(0)
                // settotalprice(0)
                // setproducts([])
                // nav("/allorders")
            }
        }
         catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-50 m-auto'>
                <label htmlFor="city">City</label>
                <input onChange={function(e){setCity(e.target.value)}} type="text" id="city" className='form-control my-3' />


                <label htmlFor="phone">Phone</label>
                <input onChange={function(e){setPhone(e.target.value)}} type="tel" id="phone" className='form-control my-3' />


                <label htmlFor="details">Details</label>
                <textarea onChange={function(e){setDetails(e.target.value)}} type="text" id="details" className='form-control my-3' ></textarea>

                <button onClick={cashPayment} className='btn btn-info'>Cash Payment</button>
                <button onClick={onlinePayment} className='btn btn-warning mx-3'>Online Payment</button>
        </div>
    );
}

export default Payment;
