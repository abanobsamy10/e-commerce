import axios from 'axios';
import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';

const Category = () => {
    async function getAllCategory() {
        try {
            let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
            // console.log(data)
            return data

        } catch (error) {
            console.log(error)
        }
    }
    async function getSpecficCategory(id) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
            console.log(data.data)
            return (<>
                {data.data.map((sub, idx) => {
                    <h1>{sub.name}</h1>
                })}
            </>)

        } catch (error) {
            console.log(error)
        }
    }
    let { data, isLoading } = useQuery("getAllCategory", getAllCategory)
    if (isLoading === true) {
        return <>
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
        </>
    }
    return (
        <>
            <div className='container pt-5'>
                <div className="row g-3">
                    {data?.data.map((cat, idx) =>
                        <div key={idx} className="col-md-4" onClick={function () { getSpecficCategory(cat._id) }}>
                            <div className="card ">
                                <img src={cat.image} className="w-100" style={{ height: "400px" }} alt="..." />
                                <div className="card-body">
                                    <h2 className="card-title text-center text-success">{cat.name}</h2>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </>
    );
}
export default Category;