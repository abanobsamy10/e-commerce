import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
import toast from 'react-hot-toast';
const ResetPassword = () => {


//     const [looading, setLoading] = useState(false)
//     let navigate = useNavigate()
//     let code = 
//     {
//         resetCode: "",
//     }
//     let valid = yup.object
//         ({
//             resetCode: yup.string().required("resetCode is required"),
//         })
//     let formik = useFormik
//         ({
//             initialValues: code, onSubmit: async function (value) {
//                 setLoading(true)
//                 try {
//                     let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", value);
//                     console.log(data)
//                     if (data.status === "Success") {
//                         navigate("/resetingpassword")
//                     }
//                 } catch (error) {
//                     console.log(error)
//                 }
//                 setLoading(false)
//             },
//             validationSchema: valid
//         })
let code=""
let navigate = useNavigate()
async function resetpassword()
{
    try {
        console.log("heeeelp")
        let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",{resetCode:code})
        console.log(data)
        if(data.status==="Success")
        {
            navigate("/resetingpassword")
        }
    } 
    catch (error) 
    {
        console.log(error)
    }
}
    return <>
        <div className='w-75 m-auto'>
            <h2 className='text-center m-3'>please enter your resetCode</h2>
                <label htmlFor="resetCode">resetCode:</label>
                <input onChange={function(e){code=e.target.value}} type="number" id="resetCode" className='form-control mb-3' />
                <div className='d-flex justify-content-between'>
                    <button onClick={resetpassword}  className='btn btn-outline-success'>
                        verify
                    </button>
                </div>

        </div>
    </>;
}

export default ResetPassword;
