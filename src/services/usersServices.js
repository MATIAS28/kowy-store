import axiosInstance from "../../utils/axiosConfig";

export const getAllUsers = async (filter) => {
    try {
        const users = await axiosInstance.get('users/'+filter)
        return users.data
    } catch (e) {
        throw e
    }
}

export const searchUser = async (id) => {
    try {
        const user = await axiosInstance.get('search-user/'+id)
        return [user.data]
    } catch (e) {
        throw e
    }
}

export const getUser = async (id) => {
    try {
        const user = await axiosInstance.get('user/'+id)
        return user.data
    } catch (e) {
        throw e
    }
}

export const getUserOrders = async (id) => {
    try {
        const orders = await axiosInstance.get('user-orders/'+id)
        
        if(orders.data.length == 0) throw 'No se encontraron ordenes'

        return orders.data
    } catch (e) {
        throw e
    }
}

export const deleteUser = async (id) => {
    try {
        const userDeleted = await axiosInstance.delete('user/'+id)
        return userDeleted.data
    } catch (e) {
        throw e
    }
}