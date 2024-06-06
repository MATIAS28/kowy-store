import axiosInstance from "../../utils/axiosConfig";


export const getGeneralStatistics = async (days) => {
    try {
        const statistics = await axiosInstance.get('general-statistics/'+days)
        return statistics.data
    } catch (e) {
        console.log(e);
        throw e
    }
}


export const getPendingOrders = async () => {
    try {
        const pendingOrders = await axiosInstance.get('pending-orders')
        return pendingOrders.data
    } catch (e) {
        throw e
    }
}

export const getBestSellers = async () => {
    try {
        const products = await axiosInstance.get('best-sellers')
        return products.data
    } catch (e) {
        throw e
    }
}

export const getOrders = async (delivered) => {
    const filter = delivered === null ? {} : {delivered: delivered}
    
    try{
        const orders = await axiosInstance.post('orders', filter)
        return orders.data
    } catch(e) {
      throw e
    }
}