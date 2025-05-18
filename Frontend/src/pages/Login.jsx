import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError } from '../utils'
import { handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Login = () => {
  const [loginInfo, setLoginInfo] =useState({
    
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = async (e)=>{
    const { name, value} = e.target;
    console.log(name, value)
    const copyLoginInfo = {...loginInfo, [name]: value}
    setLoginInfo(copyLoginInfo)
  }
  console.log(loginInfo)

  const handleLogin = async(e) =>{
    e.preventDefault();
    const {email, password} = loginInfo
    if(!email || !password){
      return handleError('email, password are required')
    } 
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        password: password
      },

    )
      const data = response.data
      console.log(data)
      
      const {message, success, jwtToken, name } = data
      if(success){
        handleSuccess(message)
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('name', name)
        setTimeout(()=>{
          navigate('/home')

        }, 2000)
      } else {
        handleError(message)
      }
    } catch (error) {
      const details = error?.response?.data?.message || "Something went wrong";
      handleError(details)
      console.log(error)
      
    }
    
  }
  return (
    
    <div className='w-72 h-fit  p-10 shadow-[0_45px_45px_rgba(0,0,0,0.35)] flex flex-col gap-2 '>
      <h1 className='text-xl font-semibold'>Signin</h1>
      <form action="" onSubmit={handleLogin}>
        
        <label className='text-lg' htmlFor="email">Email</label>
        <input onChange={handleChange} className='border-b-2 italic outline-none border-black'  type="email" name='email' placeholder='enter your email' />
        <label className='text-lg' htmlFor="name">Password</label>
        <input onChange={handleChange} className='border-b-2 italic outline-none border-black' type="password" name='password' placeholder='enter your password' />
        <button className='bg-purple-600  text-white mt-5 rounded px-2 py-2 w-full'>Sign in</button>
        <p> Create an account.. <Link to='/signup'>Sign up?</Link></p>
      </form>
      <ToastContainer/>
     </div>
     
    
  )
}

export default Login
