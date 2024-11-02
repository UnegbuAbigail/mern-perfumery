import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();
const cartItemFromLocalStoragePerf = JSON.
parse(localStorage.getItem("cart")) || []
export const CartProvider =({children}) => {
  const [user,setUser] = useState(null)
    const [cart, setCart] = useState(cartItemFromLocalStoragePerf);
    const token = localStorage.getItem("perf-token");
    function logout(){
      localStorage.removeItem("perf-token");
      localStorage.removeItem("fullname");
      window.location.reload()
      setUser(null)
    }
    const verified = async()=>{
      try {
        const req = await fetch("https://mern-perfumery-68cb.onrender.com/api/auth/verify",{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        const res = await req.json()
        console.log(res);
        
        if(res.success){
          setUser(res.user)
        }
        else{
          setUser(null)
        }
        setUser(res.user);
      } catch (error) {
        
      }
    }
    const handleAddToCart = (item)=>{
        const isPresent = cart.some((product)=> product.id === item._id)
        if(isPresent){
          const updatedCart = cart.map((product)=>{
            product._id === item._id ? {...product, quantity:product.quantity + 1}:product
          })
          setCart(updatedCart);
        }else{
          const newItem = {...item, quantity:1}
          setCart([...cart,newItem]);
          console.log([...cart,newItem]);
          toast.success("added to cart")
          
        }
        console.log("added");
        
      }
    
      // function to remove item
      function removeItem (_id){
        let remove = cart.filter((cartItx)=> cartItx._id !== _id);
        setCart(remove)
      }
      // calc total price
      const calcTotalPrice = cart.reduce((total,product)=>total + parseFloat(product.price) * product.quantity, 0)
      // handle increase
      const handleIncreaseQuantity = (itemId) => {
        const updatedCart = cart.map ((product) => 
          product._id === itemId ?{...product, quantity: product.quantity + 1} : product
        );
        setCart(updatedCart);
      };
      // handle decrease
      const handleDecreaseQuantity = (itemId) => {
        const updatedCart = cart.map ((product) => {
          if (product._id === itemId) {
            const newQuantity = product.quantity > 
            1 ? product.quantity - 1 : 1;
            return {...product, quantity:newQuantity};
          }
          return product;
        } );
        setCart(updatedCart);
      };
      useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
        verified()
      },[cart])
    return(
        <CartContext.Provider value={{
            handleAddToCart,cart,setCart,handleDecreaseQuantity,handleIncreaseQuantity,
            calcTotalPrice,removeItem,user,logout
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext