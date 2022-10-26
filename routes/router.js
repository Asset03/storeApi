const express = require('express')
const router = express.Router()


const {getAllProducts,getAllProductsStatic}=require('../controllers/products.js')

router.get('/static',getAllProductsStatic)
router.get('/',getAllProducts)



module.exports = router