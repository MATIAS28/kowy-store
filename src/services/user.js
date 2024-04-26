import axios from "axios"
const URL = import.meta.env.VITE_URL || 'http://localhost:3001/api/'

export const getAddress = async (token) => {
    try {
        const addresses = await axios.get(URL+'user', {headers:{'auth-token': token}})
        return addresses.data.user.addresses
    } catch (e) {
        throw e
    }

    
}