import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/Auth/auth';
import { cartContext } from '../../Context/Cart/Cart';
import logo from "../../images/freshcart-logo.svg"
const Navbar = () => {
  const {numofitem} = useContext(cartContext);
  const { token, setToken } = useContext(authContext)

  let navigate = useNavigate()
  function logout() {
    setToken(null)
    localStorage.removeItem("tkn")

    navigate("/login")
  }
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/"><img src={logo} className='w-100' alt="" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token ?
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brand">Brand</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/wish">wish</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="/Cart">Cart   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numofitem}
                    <span className="visually-hidden">unread messages</span>
                  </span></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category">Categoray</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/allorders">AllOrders</Link>
                </li>
              </> : ""}

          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <i className="fa-brands fa-facebook-f me-2 " ></i>
            </li>
            <li className="nav-item">
              <i className="fa-brands fa-facebook-f me-2"></i>
            </li>
            <li className="nav-item">
              <i className="fa-brands fa-facebook-f me-2"></i>
            </li>
            <li className="nav-item">
              <i className="fa-brands fa-facebook-f me-2"></i>
            </li>
            {token ?
              <>
                <li className="nav-item">
                  <span style={{ cursor: "pointer" }} onClick={logout} className="nav-link">logout</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
                </li>
              </>
              :
              <>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">register</Link>
                </li>
              </>}
          </ul>
        </div>
      </div>
    </nav>
  </>
    ;
}

export default Navbar;
