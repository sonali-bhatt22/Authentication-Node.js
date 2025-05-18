import React, { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import RefreshHandler from './RefreshHandler'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateRoute = ({element}) =>{
    return isAuthenticated ? element : <Navigate to={'/login'}/>

  }
  return (
    <div className='flex justify-center items-center h-screen '>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>

     
        
        
      </Routes>
    </div>
  )
}

export default App
