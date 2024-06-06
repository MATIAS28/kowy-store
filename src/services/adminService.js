import axios from "axios";
const ADMIN_URI = process.env.NEXT_PUBLIC_ADMIN_URL

export const registerAdmin = async (admin) => {
    try {
        const adminSaved = await axios.post(ADMIN_URI+'signin', admin)
        return adminSaved.data
    } catch (e) {
        throw e
    }
}

export const loginAdmin = async (admin) => {
    try {
        const adminToken = await axios.post(ADMIN_URI+'login', admin)
        localStorage.setItem('admin', JSON.stringify(adminToken.data));
    } catch (e) {
        console.log(e);
        throw e
    }
}