import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleError } from '../utils'

const Home = () => {
  const [loggedUser, setLoggedUser] = useState('')
  const [products, setProducts] = useState()
  const [movies, setMovies] = useState([])

  // const { id } = useParams()
  const navigate = useNavigate()
  useEffect(()=>{
    setLoggedUser(localStorage.getItem('name'))
  }, [])

  const getMovies = async ()=>{
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?limit=20')
      const data = response.data
      const finalData = data.slice(0, 100)

      console.log(finalData)
      setMovies(finalData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getMovies()
    
  }, [])

  //logout handle
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }
  
  //fetching products
  const fetchProduct = async ()=>{
    try {
      const response = await axios.get('http://localhost:8000/product', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      const data = response.data
      console.log(data)
      setProducts(data)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(()=>{
    fetchProduct()
  }, [])

  return (
    <div className='w-full h-full p-10'>
      <div className=''>
       <h1 className='text-2xl font-bold'>Welcome! {loggedUser}</h1>
       <button onClick={handleLogout} className='bg-purple-600 px-2 py-1 mt-3 text-white rounded-md'>Logout</button>
       {/* <div className='text-lg font-semibold'>
        {products && products.map((item, index)=>{
          return <ul key={index}><span>{item.name} : {item.price}</span></ul>
        })}

       </div> */}
       <h1 className='text-xl mt-4 mb-3 font-bold'>Posts</h1>
       <div className='flex flex-col gap-5'>
        {movies && movies.map((post, index)=>{
          return <div className='w-[60%] h-fit p-2 shadow-2xl'>
          <p className='text-lg font-semibold'>{post.title}</p>
          <p className='text-purple-700'>{post.body}</p>
      </div>
        })}
       </div>

    </div>
    </div>
  )
}

export default Home
