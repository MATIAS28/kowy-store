const Products = require('../models/products')
const Orders = require('../models/order')
const Users = require('../models/user')


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

async function getOrders(req, res){
    const {...filter} = req.body
    
    try {
        const orders = await Orders.find(filter)
        return res.status(200).send(orders)
    } catch (e) {
        return res.status(200).send('error returning pending orders')
    }
}

module.exports = {
    getGeneralStatistics,
    getPendingOrders,
    getBestSellers,
    getOrders
}