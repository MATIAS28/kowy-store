const Products = require('../models/products')
const Orders = require('../models/order')
const Users = require('../models/user')
const { imgsUploader, deleteImages } = require('../services/upload');
const fs = require('fs-extra');

async function getGeneralStatistics (req, res) {
    const {days} = req.params
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    try {
        let usersStats = 0
        let ordersStats = 0
        let lastSales = 0
        
        let sales = 0

        //
        const orders = await Orders.find({ "createdAt": { $gte: startDate, $lte: endDate } })
        const products = await Products.countDocuments()
        const users = await Users.countDocuments()

        //
        endDate.setDate(startDate.getDate())
        startDate.setDate(startDate.getDate() - days)

        const oldOrders = await Orders.find({ "createdAt": { $gte: startDate, $lte: endDate } })
        const oldUsers = await Users.countDocuments()
    
        if(orders.length > 0 && oldOrders.length > 0){
            lastSales = orders.reduce((initialValue, order) => { return initialValue+order.totalPrice}, 0)
            const oldSales = oldOrders.reduce((initialValue, order) => { return initialValue+order.totalPrice}, 0)
            ordersStats = ((orders.length - oldOrders.length) / oldOrders.length) * 100;
            sales = ((lastSales - oldSales) / oldSales) * 100; 
        }


        const generalStatistics = {
         orders: {
            orderCount: orders.length,
            ordersStats: ordersStats
         },

         sales: {
            lastSales: lastSales,
            salesStats: sales
         },

         users: {
            usersCount: users,
            usersStats: usersStats
         },

         products: products,
        }

        return res.status(200).send(generalStatistics)
    } catch (e) {
        return res.status(500).send('error returning statistics')
    }
}

async function getPendingOrders (req, res) {
    try {
        const pendingOrders = await Orders.find({delivered: false})
        return res.status(200).send(pendingOrders)
    } catch (e) {
        return res.status(500).send('error returning pending orders')
    }
}

async function getBestSellers (req, res){
    try {
        const bestSellers = await Orders.aggregate([
            { $unwind: "$products" }, 
            { $group: { 
                        _id: "$products._id", 
                        totalSold: { $sum: "$products.quantity" },
                        brand: {$first: "$products.brand"},
                        name: {$first: "$products.name"}, 
                        img: {$first: "$products.img"}, 
                      } 
            }, 
            { $sort: { totalSold: -1 } }, 
            { $limit: 10 }
        ])
        
        return res.status(200).send(bestSellers)
    } catch (e) {
        return res.status(500).send('error returning pending orders')
    }
}


//--------orders---------
async function getOrders(req, res){
    const {...filter} = req.body
    
    try {
        const orders = await Orders.find(filter).sort('-createdAt')
        return res.status(200).send(orders)
    } catch (e) {
        return res.status(500).send('error returning pending orders')
    }
}

async function getOrder(req, res){
    const { id } = req.params

    try {
        const order = await Orders.findById(id)
        return res.status(200).send(order)
    } catch (e) {
        return res.status(500).send('error returning pending order')
    }
}

async function updateOrderStatus(req, res){
    const {id, status} = req.body
    
    try {
        const order = await Orders.findByIdAndUpdate(id, {delivered: status}, {new: true})
        return res.status(200).send(order)
    } catch (e) {
        return res.status(500).send('error updating order') 
    }
}

//--------Products---------

async function createProduct (req, res){
    
    var {...products} = req.body;
    products.sizes = products.sizes.map((size) => JSON.parse(size))
    const newProduct = new Products(products);
    const arrayImgs = req.files && req.files.imgs ? req.files.imgs : null;

    console.log(products);

    if(!arrayImgs) return res.status(500).send({message: 'La imagen es obligatoria'})
    if(!req.files) return res.status(500).send({message: 'La imagen es obligatoria'});
    
    try {
        if (arrayImgs.length > 1) {
            for (const img of arrayImgs) {
                const imgOBJ = await imgsUploader(img.tempFilePath)
                newProduct.imgs.push(imgOBJ)
                await fs.unlink(img.tempFilePath)
            }
        }else{
            const imgOBJ = await imgsUploader(arrayImgs.tempFilePath)
            newProduct.imgs.push(imgOBJ)
        }

        newProduct.save((err, productSaved) => {
            console.log(err);
            if(err) return res.status(500).send({message: 'Error al guardar el producto'})
            if(!productSaved) return res.status(404).send({message: 'Error al guardar el producto'})
            return res.status(201).send({product: newProduct})
        })
    } catch (e) {
        console.log(e);
        res.status(404).send({message: 'Error al guardar el producto'})
    }
}

function deleteProduct(req, res) {
    try {
        Products.findByIdAndDelete(req.params.id, async (e, productDeleted) => {
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
    
    Products.findOneAndUpdate(req.params.id, productUpdate, {new: true}, (e, productUpdated) => {
        if(e) return res.status(500).send({message: 'Error al actualizar el producto'})
        if(!productUpdated) return res.status(404).send({message: 'El Producto no existe'})
        console.log(productUpdated);
        return res.status(200).send({product_updated: productUpdated})
    })
}

async function getAllProducts (req, res){
    try {
        const products = await Products.find().sort('-createdAt')
        return res.status(200).send(products)
    } catch (e) {
        return res.status(500).send('error when returning all products') 
    }
}

async function searchProduct(req, res){
    const {...search} = req.body
    const searchFilter = Object.getOwnPropertyNames(search)
    const obj = searchFilter[0]

    try {
        search[obj] = new RegExp(search[obj], 'i')
        const products = await Products.find(search)
        return res.status(200).send(products)
    } catch (e) {
        return res.status(500).send({message: 'Error al devolver el producto'})
    }
}

module.exports = {
    getGeneralStatistics,
    getPendingOrders,
    getBestSellers,

    getOrders,
    getOrder,
    updateOrderStatus,

    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    searchProduct
}