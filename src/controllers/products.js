const Product = require('../models/products');
const user = require('../models/user');
const { uploadImages, deleteImages } = require('../services/upload');
const fs = require('fs-extra');

//Crear nuevo producto(admin)
async function createProduct (req, res){
    var {...products} = req.body;
    const newProduct = new Product(products);
    const arrayImgs = req.files && req.files.imgs ? req.files.imgs : null;

    if(arrayImgs) return res.status(500).send({message: 'La imagen es obligatoria'})
    if(!req.files) return res.status(500).send({message: 'La imagen es obligatoria'});
    
    try {
        for (const img of arrayImgs) {
        const imgOBJ = await uploadImages(img.tempFilePath)
        newProduct.imgs.push(imgOBJ)
        await fs.unlink(img.tempFilePath)
        }

        newProduct.save((err, productSaved) => {
            if(err) return res.status(500).send({message: 'Error al guardar el producto'})
            if(!productSaved) return res.status(404).send({message: 'Error al guardar el producto'})
            return res.status(201).send({product: newProduct})
        })
    } catch (e) {
        res.status(404).send({message: 'Error al guardar el producto'})
    }
}

function deleteProduct(req, res) {
    try {
        Product.findByIdAndDelete(req.params.id, async (e, productDeleted) => {
            if(e) return res.status(500).send({message: 'Error al eliminar el producto'})
            if(!productDeleted) return res.status(404).send({message: 'El producto no existe'})

            for(img of productDeleted.imgs){
                await deleteImages(img.public_id)
            }

            return res.status(200).send({product_deleted: productDeleted})
        })

    } catch (e) {
        return res.status(404).send({message: 'error al eliminar el producto'})
    }

}

function updateProduct(req, res){
    const {...productUpdate} = req.body;
    
    Product.findOneAndUpdate(req.params.id, productUpdate, {new: true}, (e, productUpdated) => {
        if(e) return res.status(500).send({message: 'Error al actualizar el producto'})
        if(!productUpdated) return res.status(404).send({message: 'El Producto no existe'})
        console.log(productUpdated);
        return res.status(200).send({product_updated: productUpdated})
    })
}

function getProducts(req, res){
    const {...filters} = req.body;
    const limit = req.params.limit && req.params.limit > 0 ? req.params.limit : 0
    
        Product.find(filters, (e, products) => {
            if(e) return res.status(500).send({message: 'Error al devolver los productos'})
            if(!products || products.length === 0) return res.status(404).send({message: 'No se encontraron productos'})
        
            return res.status(200).send(products)
        }).limit(limit)
}

function getProduct(req, res){
    const {id} = req.params;

    Product.findById(id, (e, product) => {
        if(e) return res.status(500).send({message: 'Error al devolver el producto'})
        if(!product) return res.status(404).send({message: 'El producto no existe'})

        return res.status(200).send({product: product})
    })
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
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct,
    getProducts,
    searchProduct
}