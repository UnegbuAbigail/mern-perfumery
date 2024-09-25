import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import frame from '../assets/Frame.svg';
import navLogo from '../assets/perfumery-logo.svg';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className='main-container'>
      <nav>
        <div className='text-decoration-none d-flex gap-2 p-5'>
          <Link to='/'>
            <img src={navLogo} alt='company-logo' />
          </Link>
          <h2 className='d-none d-lg-block text-white'>Perfume House</h2>
        </div>
      </nav>
      <main className=' d-flex flex-column justify-content-center align-items-center'>
        <div className='form-container d-flex flex-column'>
          <Form>
            <h2 className='text-black text-start'>Welcome Back</h2>
            <p>Fill in your information to access your account.</p>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email'
                className='w-100'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your password'
                className='w-100'
              />
            </Form.Group>
            <Form.Group className='mb-3 d-flex justify-content-between align-items-center' controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
              <p>Forgot Password</p>
            </Form.Group>
            <Button className='w-100 mb-2' variant='primary' type='submit'>
              Sign in
            </Button>
            <img src={frame} alt='Divider' />
          </Form>
        </div>
      </main>
    </div>
  );
};

export default Login;