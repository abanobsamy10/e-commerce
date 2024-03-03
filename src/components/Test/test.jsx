import React, { useContext } from 'react';
import { authContext } from '../../Context/Auth/auth';
import { Navigate } from 'react-router-dom';

const PrptectedRoute = ({children}) => {
    let {token}=useContext(authContext)
    if(localStorage.getItem("tkn")==null)
    {
       return <Navigate to="/login"/>
    }
    return (
        <div>
            {children}
        </div>
    );
}

export default PrptectedRoute;
