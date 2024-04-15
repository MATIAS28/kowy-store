import axios from "axios"
const URL = import.meta.env.VITE_URL || 'http://localhost:3001/api/'

export const getProduct = async (id) => {
    try {
        const product = await axios.get(URL+'product/'+id)
        return product.data.product
    } catch (e) {
        throw e
    }
}

export const getFilters = async () => {
    try {
        const filters = await axios.get(URL+'filters')
        return filters.data
    } catch (e) {
        throw e
    }
}

export const getAllProducts = async (filters) => {
    try {
        const products = await axios.post(URL+'products', filters)
        return products.data
    } catch (e) {
        throw e
    }
}


export const getProductsByCategory = async (category, limit) => {
    try {
        const products = await axios.get(URL+'products/'+limit+'/'+category)
        return products.data
    } catch (e) {
        throw e
    }
}
 
export const searchProduct = async (search) => {
    try {
        const products = await axios.post(URL+'search-product', {name: search})
        return products.data
    } catch (e) {
        throw e
    }
}