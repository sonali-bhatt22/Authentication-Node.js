import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import axios from 'axios'
const Signup = () => {
  const [signupInfo, setSignupInfo] =useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = async (e)=>{
    const { name, value} = e.target;
    console.log(name, value)
    const copyLoginInfo = {...signupInfo, [name]: value}
    setSignupInfo(copyLoginInfo)
  }
  console.log(signupInfo)

  const handleSignup = async(e) =>{
    e.preventDefault();
    const {name, email, password} = signupInfo
    if(!name || !email || !password){
      return handleError('name, email, password are required')
    } 
    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        name: name,
        email: email,
        password: password
      },

    )
      const data = response.data
      console.log(data)
      
      const {message, success} = data
      if(success){
        handleSuccess(message)

        setTimeout(()=>{
          navigate('/login')
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
    
    <div className='w-72 h-fit  p-10 shadow-[0_45px_45px_rgba(0,0,0,0.35)] flex flex-col gap-2'>
      <h1 className='text-xl font-semibold'>Signup</h1>
      <form action="" onSubmit={handleSignup}>
        <label className='text-lg' htmlFor="name">Name</label> 
        <input onChange={handleChange} className='border-b-2 italic outline-none border-black' type="text" name='name' placeholder='enter your name' />
        <label className='text-lg' htmlFor="email">Email</label>
        <input onChange={handleChange} className='border-b-2 italic outline-none border-black'  type="email" name='email' placeholder='enter your email' />
        <label className='text-lg' htmlFor="name">Password</label>
        <input onChange={handleChange} className='border-b-2 italic outline-none border-black' type="password" name='password' placeholder='enter your password' />
        <button className='bg-purple-600  text-white mt-5 rounded px-2 py-2 w-full'>Sign up</button>
        <p>Already have an acoount? <Link to='/login'>sign in?</Link></p>
      </form>
      <ToastContainer/>
     </div>
    
  )
}

export default Signup
