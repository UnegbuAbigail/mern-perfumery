import React,{ useState,useContext} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ConfirmOrder from "./ConfirmOrder";
import products from "../product.json";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
    const {cart, removeItem, calcTotalPrice, handleIncreaseQuantity,
      handleDecreaseQuantity} = useContext(CartContext);
      const [modalShow, setModalShow] = useState(false);
      const token = localStorage.getItem("perf-token");
      const navigate = useNavigate()
      function handle(){
        if(token){
          setModalShow(true)
        }
        if(!token){
          toast.error("Sign in first")
          navigate("/auth/login")
        }
      }
  return (
    <>
     <main className = 'cart-container d-flex flex-column justify-content-center gap-2'>
        <h2 className="cart">My Cart Preview</h2>
        <div>
          {cart.length === 0 && (
            <div>
            <h3 className='fs-2 fst-italic fw-bolder text-danger'>No item(s) in the cart</h3>
            <p className='fw-bolder text-success fs-4'>Keep shopping...</p>
            </div>
            
          )}
        </div>
        {cart.map((cart) => {
          const { _id, title, price, button, image } = cart;
          return (
            <div className='row gap-3 align-items-center cart py-0 my-0 mb-3'  key={_id}>
              <div className='cart-1'>
                <img className='cart-img' src={image} alt='product image' />
              </div>
              <div className='cart-2 col d-flex flex-column m-0 p-0 ps-3'>
                <h4 className='cart-title'>{title}</h4>
                <div className='d-flex align-items-center'>
                  <button className='subtract-cart' onClick={()=>handleDecreaseQuantity(_id)}>-</button>
                  <p className='cart-number'>{cart.quantity}</p>
                  <button className='add-cart' onClick={()=>handleIncreaseQuantity(_id)}>+</button>
                </div>
                <div className='d-flex gap-4 m-0 mt-1'>
                  <p className='cart-price'>N{price}</p>
                  <button className='remove-cart' onClick={()=>removeItem(_id)}>remove</button>
                </div>
              </div>
            </div>
          );
        })}

        {cart.length === 0 ? (
          ""
        ) : (
          <>
        <div className='checkout-container'>
          <div className='checkout'>
            <p className='checkout-title'>Sub Total</p>
            <p className='checkout-price'>{(calcTotalPrice.toLocaleString())}</p>
          </div>
          <div className='checkout'>
            <p className='checkout-title'>Delivery</p>
            <p className='checkout-price'>8,000</p>
          </div>
          <div className='checkout'>
            <p className='checkout-title'>Total</p>
            <p className='checkout-price'> N{(calcTotalPrice + 8000).toLocaleString()}{" "}
               </p>
          </div>
        </div>
        <button className="w-100 checkout-btn" onClick={handle}>
          Confirm Order{' '}
        </button>
          </>
        )}
        <ConfirmOrder
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        
      </main>
    </>
  );
};

export default Cart;
