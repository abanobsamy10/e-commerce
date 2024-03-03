import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner';


const Profile = () => {
    const[user,setUesr]=useState(null)

    useEffect(function(){
        if(localStorage.getItem("tkn")!=null)
        {
            const x=jwtDecode(localStorage.getItem("tkn"))
            setUesr(x)
        }
    },[])
    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            {user?<div className='text-center'>
            <h2>Hello ya <span className='text-success'>{user.name}</span></h2>
            <h3>Role: <span className='text-success'>{user.role}</span></h3>
            <h3>UserId: <span className='text-success'>{user.id}</span></h3>
            </div>: 
            <div className='vh-100 d-flex justify-content-center align-items-center'>
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>}
        </div>
    );
}
export default Profile;