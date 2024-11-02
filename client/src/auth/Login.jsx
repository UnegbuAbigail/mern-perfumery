import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/Login.css";
import { Link, Outlet} from "react-router-dom";
import navLogo from "../assets/perfumery-logo.svg";
import frame from "../assets/Frame.svg";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../utils/ValidationSchema";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const[isClicked,setIsClicked] = useState(false);
  const navigate = useNavigate();
  // const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);
  
  const navigateToGoogle = () => {
    window.open("https://www.google.com", "_blank");
  };

  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  
  const onSubmit = async(data) => {
    setIsClicked(true)
    try {
      const req = await fetch("https://mern-perfumery-68cb.onrender.com/api/auth/signin",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      });
      const res = await req.json();
      console.log(res);

      if(!res.success){
        toast.error(res.errMsg)
        // alert(res.errMsg)
      }
      if(res.success){
        toast.success(res.message)
        localStorage.setItem("perf-token", res.user.token)
        localStorage.setItem("fullname", `${res.user.firstName} ${res.user.lastName}`)
        navigate("/")
      }
    } catch (error) {
      console.log(error.message);
      
    }
    finally{
      setIsClicked(false)
    }
    console.log(data);
    
  };
const btnTxt = isClicked ? "loading..." : "Sign In"

  function handleReveal() {
    reveal ? setReveal(false) : setReveal(true);
  }

  return (
    <>
      <main className="main-container">
        <nav>
          <div className="text-decoration-none d-flex gap-2 p-4 p-lg-2">
            <Link to="/">
              <img src={navLogo} alt="company-logo" />
            </Link>
            <h2 className="d-none d-lg-block logo-text">Perfume House</h2>
          </div>
        </nav>
        
        <section className="container d-flex flex-column justify-content-center align-items-center">
          <div className="form-container d-flex flex-column">
              <h2 className="form-hTag">Welcome Back</h2>
              <p>Fill in your information to access your account.</p>
              
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
                <span className="text-danger">{errors.email?.message}</span>
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div className="flex d-flex pswrd-div">  
                <Form.Control type={reveal ? "text" : "password"}  placeholder="Enter your password" {...register("password")}/> 
                  <div className="eye" onClick={handleReveal}>
                  {reveal ? <LuEye/> : <LuEyeOff/>}
                  {/* onClick={() => setReveal(!reveal)} */}
                  {/* onClick={() => handleReveal(!reveal)} */}
                  </div>
                </div>
                  <span className="text-danger">{errors.password?.message}</span>
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex justify-content-between gap-5"
                controlId="formBasicCheckbox"
              >
                <Form.Check type="checkbox" label="Remember me"/>
                <Link className="text-danger text-decoration-none">
                  Forgot Password
                </Link>
              </Form.Group>
              <div>
                <button type="submit" className="btn-1 w-100 text-white" disabled={isSubmitting}>
                  {btnTxt}
                </button>
                <img src={frame} alt="frame-divider" className="mt-2 w-100" />
                <button
                  className="btn-2 w-100 mt-2"
                  type="submit"
                  onClick={navigateToGoogle}
                >
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-2"
                  >
                    <path
                      d="M22.2861 9.44575H21.4V9.4001H11.5V13.8001H17.7167C16.8097 16.3614 14.3727 18.2001 11.5 18.2001C7.85515 18.2001 4.9 15.2449 4.9 11.6001C4.9 7.95525 7.85515 5.0001 11.5 5.0001C13.1825 5.0001 14.7131 5.6348 15.8786 6.67155L18.9899 3.5602C17.0253 1.72925 14.3974 0.600098 11.5 0.600098C5.42525 0.600098 0.5 5.52535 0.5 11.6001C0.5 17.6748 5.42525 22.6001 11.5 22.6001C17.5748 22.6001 22.5 17.6748 22.5 11.6001C22.5 10.8625 22.4241 10.1426 22.2861 9.44575Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M1.76801 6.48015L5.38205 9.1306C6.35995 6.7095 8.72825 5.0001 11.4997 5.0001C13.1822 5.0001 14.7128 5.6348 15.8783 6.67155L18.9896 3.5602C17.025 1.72925 14.3971 0.600098 11.4997 0.600098C7.2746 0.600098 3.61051 2.98545 1.76801 6.48015Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M11.5 22.6001C14.3413 22.6001 16.923 21.5128 18.875 19.7445L15.4705 16.8636C14.3661 17.7002 12.9933 18.2001 11.5 18.2001C8.63893 18.2001 6.20957 16.3758 5.29437 13.8298L1.70728 16.5936C3.52778 20.1559 7.22487 22.6001 11.5 22.6001Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M22.286 9.4458H21.4V9.40015H11.5V13.8001H17.7167C17.2811 15.0305 16.4896 16.0914 15.4688 16.8642C15.4693 16.8636 15.4699 16.8636 15.4704 16.8631L18.875 19.744C18.6341 19.9629 22.5 17.1001 22.5 11.6001C22.5 10.8626 22.4241 10.1426 22.286 9.4458Z"
                      fill="#1976D2"
                    />
                  </svg>
                  Continue with Google
                </button>

                <p className="mt-3 link-pTag">
                  Don't have an account ?{" "}
                  <Link to="/auth/signup" className="text-decoration-none link">
                    Sign Up
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Outlet />
    </>
  );
};

export default Login;