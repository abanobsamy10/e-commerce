import React, { useEffect, useState } from 'react';
import axios from "axios";
import { createContext } from "react";
export let cartContext = createContext()
const CartProcider = ({ children }) => {
    const [numofitem, setnumofitem] = useState(0)
    const [totalprice, settotalprice] = useState(0)
    const [products, setproducts] = useState(null)
    const [cartid, setcartId] = useState(null)

useEffect(function(){getUserCart()},[])

    async function removeItem(id)
    {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: { token: localStorage.getItem("tkn") } });

            if(data.status==="success")
            {
                setnumofitem(data.numOfCartItems)
                settotalprice(data.data.totalCartPrice)
                setproducts(data.data.products)
            }
            return data 
        } catch (error) {
            console.log(error)
        }
    }
    async function AddProductToCart(productId) {
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId: productId }, { headers: { token: localStorage.getItem("tkn") } });
            if (data.status === "success") {
                getUserCart()
            }
            return data
        }
        catch (error) {
            console.log(error)
        }

    }
    async function getUserCart() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token: localStorage.getItem("tkn") } })

            console.log(data, "cartuser")
            if(data.status==="success")
            {
                setnumofitem(data.numOfCartItems)
                settotalprice(data.data.totalCartPrice)
                setproducts(data.data.products)
                setcartId(data.data._id)
            }
            return data
        }
        catch (error) {

            setproducts([])
        }
    }
    async function update(id,count)
    {
        try 
        {
            let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},{headers:{token:localStorage.getItem('tkn')}})
            if(data.status==="success")
            {
                setnumofitem(data.numOfCartItems)
                settotalprice(data.data.totalCartPrice)
                setproducts(data.data.products)
            }
            return data 
        }
        catch (error)
        {
            console.log(error)
        }
    }
    async function clear()
    {
        try 
        {
            const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:{token:localStorage.getItem('tkn')}})
            if(data.message==="success")
            {
                setnumofitem(0)
                settotalprice(0)
                setproducts([])
            }
            return data 
        }
        catch (error)
        {
            console.log(error)
        }
    }
    return (
        <cartContext.Provider value={{ AddProductToCart, numofitem, totalprice , products ,removeItem,update ,clear,cartid,setnumofitem,settotalprice,setproducts}}>
            {children}
        </cartContext.Provider>
    );
}

export default CartProcider;
