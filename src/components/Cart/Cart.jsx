import React from 'react';
import { cartContext } from '../../Context/Cart/Cart.js';
import { useContext } from 'react';
import { DNA } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { numofitem, totalprice, products,removeItem ,update ,clear} = useContext(cartContext);

    async function remove (id)
    {
        const res= await removeItem(id)
        if (res.status === "success") {
            toast.success("Item removed successfully", { duration: 2000 })
        } else {
            toast.error("error", { duration: 2000 })
        }
    }

    async function updated (id,count)
    {
        const res= await update(id,count)
        if (res.status === "success") {
            toast.success("count updated successfully", { duration: 2000 })
        } else {
            toast.error("error", { duration: 2000 })
        }
    }



    async function clearing ()
    {
        await clear()
    }
    if (products === null) {
        return <div className='vh-100 d-flex justify-content-center align-items-center'>
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    }
    if (products.length === 0 ) {
        return <div className='vh-100 d-flex justify-content-center align-items-center'>
            <h2>No Data To Display</h2>
        </div>
    }
    return (
        <div style={{ backgroundColor: "#eee" }} className='py-5 container'>
            <h1>shop Cart</h1>
            <h3 className='text-success'>{totalprice}</h3>
            <button className='btn btn-warning my-3' onClick={clearing}>clear Cart</button>
            <Link to={"/payment"} className='btn btn-info my-3 mx-2 ' >Payment</Link>
            {products?.map(function (product, idx) {
                return <div key={idx} className='row border-bottom border-1 py-3 align-items-center'>
                    <div className='col-md-1'>
                        <img src={product.product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className='col-md-8'>
                        <div>
                            <h4>{product.product.title}</h4>
                            <h6>{product.price}EGP</h6>
                            <button className='btn btn-danger' onClick={function(){remove(product.product.id)}}>remove</button>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="d-flex align-items-center">
                            <button className='btn btn-outline-success' onClick={function(){updated(product.product.id,product.count++)}}>+</button>
                            <span className='mx-2'>{product.count}</span>
                            {product.count<=0?<button className='btn btn-outline-danger'  onClick={function(){updated(product.product.id,product.count--)}}>-</button>:  <button className='btn btn-outline-danger'  onClick={function(){remove(product.product.id)}}>-</button>}
                          
                        </div>
                    </div>
                </div>
            })}


        </div>
    );
}

export default Cart;
