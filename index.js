require('dotenv').config()
require("express-async-errors")
const notFoundMiddleware = require('./middleware/error-handler')
const errorMiddleware = require('./middleware/error-handler')

const express = require('express')
const app = express()



const connectDB = require('./db')
const router = require('./routes/router.js')

const PORT = process.env.PORT || 3000
//middleware
app.use(express.json())




// routes
app.get('/',(req,res)=>{
    res.send(`<h1>Store API</h1><a href="/api/v1/products">products route</a>`)
})

app.use('/api/v1/products',router)

app.use(errorMiddleware)
app.use(notFoundMiddleware)

// start
const start = async()=>{
    try {
        await connectDB(process.env.DB_URL)
        app.listen(3000,()=>console.log(`Server started on port ${PORT}...`))
    } catch (error) {
        console.log(error);
    }
}

start()