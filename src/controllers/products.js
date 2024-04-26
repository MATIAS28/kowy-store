const Product = require('../models/products');
const user = require('../models/user');

async function getFilters(req, res){
    try {
        const categories = await Product.distinct('category');
        const brands = await Product.distinct('brand')
        const sizes = await Product.distinct('size')

        return res.status(200).send({categories: categories, brands: brands})
        
    } catch (e) {
        return res.status(500).send({message: 'Error al devolver los filtros'})
    }
}

async function getAllProducts(req, res){
    const {category, brand} = req.body
    const query = {}

    try {

        if(category.length === 0){
         const products = await Product.find()
         return res.status(200).send(products)
        }

        if (category && category.length > 0) {
            query.category = { $in: category };
        }
    
        if (brand && brand.length > 0) {
            query.brand = { $in: brand };
        }

        const products = await Product.find({...query, available: true})
        return res.status(200).send(products)
    } catch (e) {
        return res.status(500).send({message: 'Error al devolver los productos'})
    }
}

async function getProducts(req, res){
    const {category} = req.params
    const limit = req.params.limit === 'undefined' ? 0  : req.params.limit

    try {
        const products = await Product.find({category: category, available: true}).limit(limit)
        
        if(!products || products.length === 0) {
        return res.status(404).send({message: 'No se encontraron productos'})
        }

        return res.status(200).send(products)
    } catch (e) {
        res.status(500).send({message: 'Error al devolver los productos'})
    }
}

function getProduct(req, res){
    const {id} = req.params;

    Product.findById(id, (e, product) => {
        if(e) return res.status(500).send({message: 'Error al devolver el producto'})
        if(!product) return res.status(404).send({message: 'El producto no existe'})
        if (!product.available)  return res.status(404).send({message: 'Producto no desponible'})

        return res.status(200).send({product: product})
    })
}

async function getNewArrivals (req, res){
    const { limit } = req.params
    const date = new Date()
    date.setDate(date.getDate() - 14)
    
    try {
        const newProducts = await Product.find({ createdAt: { $gte: date }, available: true })
        .sort({ createdAt: -1 }).limit(limit)
        
        if(newProducts.length == 0){
            let latestProducts = await Product.find({available: true}).limit(limit)
            return res.status(200).send(latestProducts)
        }

        return res.status(200).send(newProducts)
    } catch (e) {
        return res.status(500).send({message: 'Error al devolver los productos'})
    }

}

async function searchProduct(req, res){
    const {...search} = req.body
    const searchFilter = Object.getOwnPropertyNames(search)
    const obj = searchFilter[0]

    try {
        search[obj] = new RegExp(search[obj], 'i')
        const products = await Product.find(search)
        return res.status(200).send(products)
    } catch (e) {
        return res.status(500).send({message: 'Error al devolver el producto'})
    }
}


module.exports = {
    getProduct,
    getProducts,
    getAllProducts,
    getNewArrivals,
    getFilters,
    searchProduct
}