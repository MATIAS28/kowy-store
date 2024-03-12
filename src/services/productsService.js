import axios from "axios"
const ADMIN_URI = process.env.NEXT_PUBLIC_ADMIN_URL

export const getAllProducts = async () => {
    try {
        const products = await axios.get(ADMIN_URI+'all-products')
        console.log(products);
        return products.data
    } catch (e) {
        throw e
    }
}

export const searchProduct = async (search) => {
    try {
        const products = await axios.post(ADMIN_URI+'search-product', {name: search})
        console.log(products);
        return products.data
    } catch (e) {
        throw e
    }
}

export const saveProduct = async (newProduct, imgs) => {
    const formData = new FormData()

    if (imgs) {
        formData.append('imgs', imgs)
        for (const key in newProduct) {
            if(key == "sizes"){
                formData.append(key, JSON.stringify(newProduct[key]))
            }

            formData.append(key, newProduct[key])
        }
    }
    
    try {
        const productSaved = await axios.post(ADMIN_URI+'product', formData, 
        {headers: {'Content-Type': 'multipart/form-data'}})

        console.log(productSaved)
        return productSaved
    } catch (e) {
        throw e
    }
} 