import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';

const Brand = () => {
    async function getAllBrands() {
        try {
            let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")

            return data
        } catch (error) {
            console.log(error)
        }
    }
    async function getSpecificBrands(id) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
            toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <img
                          className="h-10 w-10"
                          src={data.data.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {data.data.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
        } catch (error) {
            console.log(error)
        }
    }

    let { data, isLoading } = useQuery("getAllBrands", getAllBrands)
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
                <h2 className='text-success text-center mb-5'>All Brands</h2>
                <div className="row g-3">
                    {data?.data.map((brands, idx) =>
                        <div key={idx} className="col-md-3" onClick={function () { getSpecificBrands(brands._id) }}>
                            <div className="card">
                                <img src={brands.image} className="w-100 " alt="..." />
                                <div className="card-body">
                                    <p className="card-title text-center ">{brands.name}</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </>
    );
}

export default Brand;
