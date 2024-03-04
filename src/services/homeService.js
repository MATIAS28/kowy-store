import axios from "axios";

const ADMIN_URI = process.env.NEXT_PUBLIC_ADMIN_URL

export const getGeneralStatistics = async (days) => {
    try {
        const statistics = await axios.get(ADMIN_URI+'general-statistics/'+days)
        return statistics.data
    } catch (e) {
        throw e
    }
}


export const getPendingOrders = async () => {
    try {
        const pendingOrders = await axios.get(ADMIN_URI+'pending-orders')
        return pendingOrders.data
    } catch (e) {
        throw e
    }
}

export const getBestSellers = async () => {
    try {
        const products = await axios.get(ADMIN_URI+'best-sellers')
        return products.data
    } catch (e) {
        throw e
    }
}

export const getOrders = async (delivered) => {
    const filter = delivered === null ? {} : {delivered: delivered}
    
    try{
        const orders = await axios.post(ADMIN_URI+'orders', filter)
        return orders.data
    } catch(e) {
      throw e
    }
}