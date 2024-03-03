import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';


export let WishContext = createContext()


const Wishprovider = ({ children }) => {
    const [products, setproducts] = useState(null)

    useEffect(function () { getUserWish() }, [])
    async function AddProductToWish(productId) {
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId: productId }, { headers: { token: localStorage.getItem("tkn") } });
            toast.success(data.message)
            getUserWish()
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
    async function getUserWish() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers: { token: localStorage.getItem("tkn") } })
            if (data.status === "success") {
                setproducts(data)
            }
            return data
        }
        catch (error) {
            setproducts([])
        }
    }
    async function removefromwish(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { token: localStorage.getItem("tkn") } })
            if (data.status === "success") {
                toast.success(data.message)
                getUserWish()
            }
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <WishContext.Provider value={{ AddProductToWish, products, removefromwish }}>
            {children}
        </WishContext.Provider>
    );
}
export default Wishprovider;
