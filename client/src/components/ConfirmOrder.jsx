import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import success from "../assets/Success Icon.png"
// import confirmations from "../checkout.json";
import { Link, Outlet } from 'react-router-dom';
import CartContext from '../context/CartContext';

const ConfirmOrder = (props) => {
  const {cart, calcTotalPrice } = useContext(CartContext)
  return (
    <>
      <Modal
        className='d-flex flex-column custom-modal-width gateway'
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton >
          <Modal.Title _id='contained-modal-title-vcenter' >
            <img className='confirmation' src={success} alt='success-icon' />
            <h2 className='confirmation-confirmed'>Order Confirmed</h2>
            <p className='confirmation-title'>We hope you enjoy your order</p>
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {cart.map((cart) => {
            const { _id, image, title, quantity, price} = cart;
            return (
              <div className='d-flex justify-content-between align-items-center py-2'>
                <div className='d-flex gap-3 align-items-center gateway-container' key={_id}>
                  <img src={image} alt='productname'className='gateway-image'/>
                  <div>
                    <p className='gateway-title'>{title}</p>
                    <div className='d-flex gap-2'>
                      <p className='gateway-quantity'>{cart.quantity}x</p>
                      <p className='gateway-price'>N{price}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className='gateway-amount'>N{(cart.quantity * price).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
          <div className='d-flex justify-content-between align-items-center py-2'>
            <p className='gateway-total'>Order Total</p>
            <p className='gateway-total-price'>N{(calcTotalPrice + 8000 ).toLocaleString()}</p>
          </div>

          <button className='w-100 gateway-button'>Start New Order</button>
        </Modal.Body>
      </Modal>
      <Outlet/>
    </>
  );
};

export default ConfirmOrder;