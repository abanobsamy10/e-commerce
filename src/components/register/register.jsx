import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"

const Register = () => {

    const [error,seterror]=useState(null)
    const [SUC,setSUC]=useState(null)
    const [looading,setLoading]=useState(false)
    let navigate= useNavigate()


    let user={
        name:"" ,
        email:"",
        password:"",
        rePassword:"",
        phone:""
    }
    let valid= yup.object
    ({
    name :yup.string().required("name is required").min(3,"min length is 3 chars").max(10,"max length is 10 chars") ,
    email:yup.string().required("email is required"),
    password:yup.string().required("password is required"),
    rePassword:yup.string().required("password is required").oneOf([yup.ref("password")],"enter same password"),
    phone:yup.string().required("phone is required")
    })
//.matches(/^01[0125][0-9]{8}$ /,"enter egyption number")
//.matches(/^[A-Z][a-z0-9]{3,10}$ /, "enter valid password")
    let formik=useFormik
    ({initialValues:user ,onSubmit: async function(value){

        setLoading(true)
        try {
            let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value);
            if(data.message==="success")
            {
                setSUC("ro7 login")
                setTimeout(function(){
                    navigate("/login")
                },3000)
                 
            }
        } catch (error) {
            seterror(error.response.data.message)
        }
        setLoading(false)
    },
    validationSchema:valid
    })
    return <>
        {error?<div className='alert alert-danger'>{error}</div>:""}
        {SUC?<div className='alert alert-success'>{SUC}</div>:""}
       <div className='w-75 m-auto'> 
        <h2 className='text-center m-3'>Register Form</h2>
        <form onSubmit={formik.handleSubmit} >
            <label htmlFor="name">Name:</label>
            <input    onBlur={formik.handleBlur}  value={formik.values.name } onChange={formik.handleChange} type="text" id="name" className='form-control mb-3' />
            
            
            
            
            {formik.errors.name && formik.touched.name?
            <div className="alert alert-danger">
            {formik.errors.name}
            </div>:""}



            <label htmlFor="email">email:</label>
            <input    onBlur={formik.handleBlur}   value={formik.values.email} onChange={formik.handleChange} type="email" id="email" className='form-control mb-3' />
           
           
           
            {formik.errors.email && formik.touched.email?
            <div className="alert alert-danger">
            {formik.errors.email}
            </div>:""}




            <label htmlFor="password">password:</label>
            <input    onBlur={formik.handleBlur}   value={formik.values.password} onChange={formik.handleChange} type="password" id="password" className='form-control mb-3' />
            


            {formik.errors.password  && formik.touched.password?
            <div className="alert alert-danger">
            {formik.errors.password}
            </div>:""}



            <label htmlFor="rePassword">rePassword:</label>
            <input    onBlur={formik.handleBlur}   value={formik.values.rePassword} onChange={formik.handleChange} type="password" id="rePassword" className='form-control mb-3' />


            {formik.errors.rePassword  && formik.touched.rePassword?
            <div className="alert alert-danger">
            {formik.errors.rePassword}
            </div>:""}


            <label htmlFor="phone">phone:</label>
            <input    onBlur={formik.handleBlur}    value={formik.values.phone} onChange={formik.handleChange}type="tel" id="phone" className='form-control mb-3' />
            
            {formik.errors.phone  && formik.touched.phone?
            <div className="alert alert-danger">
            {formik.errors.phone}
            </div>:""}


            
            <button type="submit"className='btn btn-success'>
                {looading?<Circles
                    width="25"
                    color="white"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    /> :"Submit"}
            </button>
        </form>
    </div>
    </>;
}

export default Register;
