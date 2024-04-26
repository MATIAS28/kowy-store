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
    products.sizes = products.sizes ? JSON.parse(products.sizes[0]) : null
    const newProduct = new Products(products)
    const imgs = req.files?.imgs
    
    if(!req.files) return res.status(500).send({message: 'La imagen es obligatoria'});
    
    try {
        if (Array.isArray(imgs)) {
            for (const img of imgs) {
                const imgOBJ = await imgsUploader(img.tempFilePath, newProduct.category)
                newProduct.imgs.push(imgOBJ)
            }
        }else{
            const imgOBJ = await imgsUploader(imgs.tempFilePath, newProduct.category)
            newProduct.imgs.push(imgOBJ)
        }

        const productSaved = await newProduct.save()
        return res.status(201).send(productSaved)
    } catch (e) {
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

            return res.status(200).send('Producto eliminado correctamente')
        })

    } catch (e) {
        return res.status(404).send({message: 'error al eliminar el producto'})
    }

}

async function updateProduct(req, res){
    let productUpdate = {}
    const imgs = req.files?.imgs
    const imgsDeleted = JSON.parse(req.body.imgsDeleted)
    
    for (const key in req.body) {
        if (key == "imgsDeleted") {
            continue
        }
        productUpdate = {...productUpdate, [key]: JSON.parse(req.body[key])}
    }

    if (imgs && Array.isArray(imgs)) {
        for (const img of imgs) {
            const imgOBJ = await imgsUploader(img.tempFilePath, productUpdate.category)
            productUpdate.imgs.push(imgOBJ)
        }
    }
    
    if (imgs && !Array.isArray(imgs)) {
        const imgOBJ = await imgsUploader(imgs.tempFilePath, productUpdate.category)
        productUpdate.imgs.push(imgOBJ)
    }

    try {
        if (imgsDeleted.length > 0) {
            for(let img of imgsDeleted){
                await deleteImages(img.public_id)
            }
        }
        const productUpdated = await Products.findByIdAndUpdate(req.params.id, productUpdate, {new: true})
        return res.status(201).send(productUpdated)
    } catch (e) {
        console.log(e);
        return res.status(500).send('Error updating product')
    }
}

async function updateProductStatus(req, res){
    const {id, status} =  req.params

    try {
        const productUpdated =  await Products.findByIdAndUpdate(id, {available: status}, {new: true})
        return res.status(201).send(productUpdated) 
    } catch (e) {
        return res.status(500).send('error updating product status', e)
    }
}

async function getAllProducts (req, res){
    try {
        const products = await Products.find().sort('-createdAt')
        return res.status(200).send(products)
    } catch (e) {
        return res.status(500).send('error returning all products') 
    }
}

async function getProduct (req, res){
   try {
    const product = await Products.findById(req.params.id)
    
    if (!product) return res.status(404).send('producto no encontrado')
    
    return res.status(200).send(product)
   } catch (e) {
    return res.status(500).send('error returning product '+req.params.id) 
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

//Users
async function getAllUsers(req, res){
    const {clients} = req.params

    try {
        if (clients === 'true') {
            let users = await Users.find({oreders: {$gt: [{$size: 'oreders'}, 0]}})
            console.log(users);
            return res.status(200).send(users)
        }else{
            let users = await Users.find().sort('-createdAt')
            return res.status(200).send(users)
        }
    } catch (e) {
        return res.status(500).send({message: 'Error al devolver los usuarios'})
    }
}

async function getUser(req, res){
    const {id} = req.params

    try {
        const user = await Users.findById(id)
        return res.status(200).send(user)
    } catch (e) {
        return res.status(500).send({message: 'Error al devolver el usuarios'})
    }
}

async function searchUser(req, res){
    const {id} = req.params

    try {
        const user = await Users.findById(id)
        if (user == null) return res.status(404).send('usuario no encontrado')
        return res.status(200).send(user)
    } catch (e) {
        return res.status(500).send({message: 'Error al devolver el usuarios'})
    }
}

async function getUserOrders(req, res){
    const {id} = req.params

    try {
        const orders = await Orders.find({user: id}).sort('-createdAt')
        return res.status(200).send(orders)
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error al devolver las ordenes'})
    }
}

async function deleteUser(req, res){
    const {id} = req.params

    try {
        const userDeleted = await Users.findByIdAndDelete(id)
        return res.status(200).send(userDeleted)
    } catch (e) {
        return res.status(500).send({message: 'Error al eliminar el usuario'})
    }
}

module.exports = {
    //Statistics
    getGeneralStatistics,
    getPendingOrders,
    getBestSellers,

    //Orders
    getOrders,
    getOrder,
    updateOrderStatus,

    //Products
    createProduct,
    deleteProduct,
    updateProduct,
    updateProductStatus,
    getAllProducts,
    getProduct,
    searchProduct,

    //Users
    getAllUsers,
    getUser,
    searchUser,
    getUserOrders,
    deleteUser
}