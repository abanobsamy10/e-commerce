import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { authContext } from '../../Context/Auth/auth';

const Login = () => {
    const [error, seterror] = useState(null)
    const [SUC, setSUC] = useState(null)
    const [looading, setLoading] = useState(false)
    let { token, setToken } = useContext(authContext)
    let navigate = useNavigate()
    let user = {
        email: "",
        password: "",
    }
    let valid = yup.object
        ({
            email: yup.string().required("email is required"),
            password: yup.string().required("password is required"),
        })
    //.matches(/^01[0125][0-9]{8}$ /,"enter egyption number")
    //.matches(/^[A-Z][a-z0-9]{3,10}$ /, "enter valid password")
    let formik = useFormik
        ({
            initialValues: user, onSubmit: async function (value) {

                setLoading(true)
                try {
                    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", value);
                    if (data.message === "success") {
                        setSUC(data.message)
                        localStorage.setItem("tkn", data.token)
                        setToken(data.token)
                        setTimeout(function () {
                            navigate("/")
                        }, 3000)
                        setToken(data.token)
                    }
                } catch (error) {
                    seterror(error.response.data.message)
                }

                setLoading(false)
            },
            validationSchema: valid
        })
    return <>
        {error ? <div className='alert alert-danger'>{error}</div> : ""}
        {SUC ? <div className='alert alert-success'>{SUC}</div> : ""}
        <div className='w-75 m-auto'>
            <h2 className='text-center m-3'>Login Form</h2>
            <form onSubmit={formik.handleSubmit} >
                <label htmlFor="email">email:</label>
                <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id="email" className='form-control mb-3' />
                {formik.errors.email && formik.touched.email ?
                    <div className="alert alert-danger">
                        {formik.errors.email}
                    </div> : ""}
                <label htmlFor="password">password:</label>
                <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" id="password" className='form-control mb-3' />
                {formik.errors.password && formik.touched.password ?
                    <div className="alert alert-danger">
                        {formik.errors.password}
                    </div> : ""}
                <div className='d-flex justify-content-between'>
                    <button type="submit" className='btn btn-success'>
                        {looading ? <Circles
                            width="25"
                            color="white"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /> : "Submit"}
                    </button>
                    <Link to="/forget">forget your password ?</Link>
                </div>
            </form>
        </div>
    </>;
}

export default Login;
