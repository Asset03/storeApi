const Product = require('../models/products')

const getAllProductsStatic = async (req, res) => {
    const search = 'ab'
    const products = await Product.find({
        // name:{$regex:search,$options:'i'}
    }).limit(3)
    res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async (req, res) => {
    const { featured, company, name,sort,field,numericFilters} = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = {$regex:name,$options:'i'}
    }

    if(numericFilters){
        console.log(numericFilters);
        const operatorMap = {
            '>':"$gt",
            ">=":'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(<|<=|=|>=|>)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)

        const options = ['price','rating']

        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field]= {[operator]:Number(value)}
            }
        })
        console.log(queryObject);


    }



    let result = await Product.find(queryObject)
     if(sort){
        const sortList = sort.split(',').join(' ')
        result = await Product.find(queryObject).sort(sortList)
     }else{
        result = await Product.find(queryObject).sort('createdAt')
     }

     if(field){
        const fieldList = field.split(',').join(" ")
        result = await Product.find(queryObject).select(fieldList)
     }
    

     const page = Number(req.query.page) ||1
     const limit = Number(req.query.limit) || 10
     const skip = (page-1)*limit

     result = await Product.find(queryObject).skip(skip).limit(limit)
     

    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}


module.exports = {
    getAllProducts, getAllProductsStatic
}