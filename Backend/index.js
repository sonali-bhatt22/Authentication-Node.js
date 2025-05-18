const express = require("express")
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./Models/db') 
app.use(express.json())
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
const PORT = process.env.PORT || 8000
app.use(cors({
    origin: 'http://localhost:5173', // allow your frontend to connect
    credentials: true,               // if you're using cookies/auth headers
  }));

app.use("/auth", AuthRouter)
app.use('/product', ProductRouter)

app.listen(PORT, ()=>{
    
    console.log(`Server is running on ${PORT}`)
})

