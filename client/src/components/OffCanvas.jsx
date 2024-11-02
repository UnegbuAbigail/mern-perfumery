import React, { useContext } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import menuIcon from '../assets/menu.svg';
import {Link} from 'react-router-dom';
import CartContext from '../context/CartContext';
import LogOut from "./LogOut";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";

const OffCanvass = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const {user} = useContext(CartContext);
  const fullName = localStorage.getItem("fullname")
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("perf-token");

function toggleIsRevealed() {
  isReveal ? setIsReveal(false) : setIsReveal(true);
}
  return (
    <>
      <div onClick={handleShow}>
        <img src={menuIcon} alt="menu-icon" />
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Body>
          {token ? 
          <> 
          <div className="mt-3 text-center">
          <h2>{`Hi, ${fullName}`}
          <span className="ms-3">
                    {isReveal ?
                     <img
                     onClick={toggleIsRevealed}
                       src={arrowUp}
                       alt="arrow-up-icon"
                       role="button"
                     />
                     :
                     <img
                     onClick={toggleIsRevealed}
                     src={arrowDown}
                     alt="drop-down-icon"
                     role="button"
                     />
                    }
                  </span>
                    </h2> 
                  <div >
                    {isReveal && <LogOut/>}</div>
              </div>
          </> 
          : 
           <div className="d-flex flex-column container mt-3 gap-3">
            <button className="login-btn w-100">
              <Link
                className="text-decoration-none login-link"
                to="/auth/login"
              >
                Log In
              </Link>
            </button>
            <button className="sign-up-btn w-100">
              <Link
                className="text-decoration-none sign-up-link"
                to="/auth/signup"
              >
                Sign Up
              </Link>
            </button>
          </div>}
         
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvass;