require('dotenv').config() 

const connectDB = require('./db')
const Product = require('./models/products')

const jsonProducts  = require('./products.json')

const start = async ()=>{
    try {
        await connectDB(process.env.DB_URL)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log("Success!!!");
        process.exit(0)
    } catch (error) {
        console.log(error);
    }
}

start()