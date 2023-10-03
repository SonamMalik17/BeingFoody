import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReducer';
import Badge from "react-bootstrap/Badge";
import Cart from '../screens/Cart';
import Modal from '../Modal';
export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  console.log("Cart Data:", data);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">BeingFoody</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/"> About</Link>
              </li>
              {
                (localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/myorder"> My Orders</Link>
                  </li> : ""
              }
            </ul>
            <div className="d-flex">
              {
                (localStorage.getItem("authToken")) ?
                  <>
                    <button className="btn btn-success me-1" type="button" onClick={() => setCartView(true)}>
                      My Cart{" "}
                      {data.length > 0 && (
                        <Badge pill bg='danger'>{data.length}</Badge>
                      )}
                    </button>
                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                    <button className="btn btn-danger" type="button" onClick={handleLogout}>Logout</button>
                  </>
                  :
                  <>
                    <Link className="btn btn-success me-1" type="button" to="/login">Login</Link>
                    <Link className="btn btn-success" type="button" to="/createuser">Signup</Link>
                  </>

              }

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
