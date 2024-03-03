import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup"
import toast from 'react-hot-toast';



const ForgetPassword = () => {
    
    const [looading, setLoading] = useState(false)
    let navigate = useNavigate()
    let user = {
        email: "",
    }
    let valid = yup.object
        ({
            email: yup.string().required("email is required"),
        })
    let formik = useFormik
        ({
            initialValues: user, onSubmit: async function (value) {
                setLoading(true)
                try 
                {
                let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", value);
                console.log(data)
                toast.success(data.message)
                if (data.statusMsg === "success") 
                {
                    navigate("/ResetPassword")
                }
                } catch (error) 
                {
                    console.log(error)
                }
                setLoading(false)
            },
            validationSchema: valid
        })
    return <>
        <div className='w-75 m-auto'>
            <h2 className='text-center m-3'>please enter your email</h2>
            <form onSubmit={formik.handleSubmit} >
                <label htmlFor="email">email:</label>
                <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id="email" className='form-control mb-3' />
                <div className='d-flex justify-content-between'>
                    <button type="submit" className='btn btn-outline-success'>
                        {looading ? <Circles
                            width="25"
                            color="red"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /> : "verify"}
                    </button>
                </div>
            </form>
        </div>
    </>;

}

export default ForgetPassword;
