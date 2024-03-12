import axios from "axios"
const ADMIN_URI = process.env.NEXT_PUBLIC_ADMIN_URL

export const getOrderById = async (id) => {
    try {
        const order = await axios.get(ADMIN_URI+'order/'+id)
        return [order.data]
    } catch (e) {
        throw e
    }
}

export const updateOrderStatus = async (id, status) => {
    try {
        const orderUpdated = await axios.post(ADMIN_URI+'update-order-status', {id: id, status: status})
        return orderUpdated.data
    } catch (e) {
        throw e
    }
}