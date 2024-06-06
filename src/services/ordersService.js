import axiosInstance from "../../utils/axiosConfig";

export const getOrderById = async (id) => {
    try {
        const order = await axiosInstance.get('order/'+id)
        return [order.data]
    } catch (e) {
        throw e
    }
}

export const updateOrderStatus = async (id, status) => {
    try {
        const orderUpdated = await axiosInstance.post('update-order-status', {id: id, status: status})
        return orderUpdated.data
    } catch (e) {
        throw e
    }
}