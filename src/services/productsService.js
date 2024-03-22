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

export const getProduct = async (id) => {
    try {
        const product = await axios.get(ADMIN_URI+'product/'+id)
        return product.data
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

    if (!imgs) {
        throw new Error('No has agregado imagenes') 
    }
    
    if(!newProduct){
        throw new Error('Faltan datos')
    }

    
    imgs.map((img, i) => {
        formData.append('imgs', img)
    })


    for (const key in newProduct) {
        if(key == "sizes"){
            formData.append(key, JSON.stringify(newProduct[key]))
        }

        formData.append(key, newProduct[key])
    }

    try {
        const productSaved = await axios.post(ADMIN_URI+'product', formData, 
        {headers: {'Content-Type': 'multipart/form-data'}})

        return productSaved.data
    } catch (e) {
        throw e
    }
} 


export const updateProduct = async (product, imgs, imgsDeleted) => {
    const formData = new FormData()

    if (imgs) {
        imgs.map((img, i) => {
            formData.append('imgs', img)
        })
    }

    for (const key in product) {
        formData.append(key, JSON.stringify(product[key]))
    }

    if (imgsDeleted) {
        formData.append('imgsDeleted', JSON.stringify(imgsDeleted))
    }

    try {
        const productUpdated = await axios.post(ADMIN_URI+'update-product/'+product._id, formData,
        {headers: {'Content-Type': 'multipart/form-data'}})
        return productUpdated.data
    } catch (e) {
        throw e
    }

}


export const deleteProduct = async (id) => {
    try {
        const productDeleted = await axios.delete(ADMIN_URI+'product/'+id)
        console.log(productDeleted);
        return productDeleted.data
    } catch (e) {
        throw e
    }
}


export const updateStatus = async (id, status) => {
    try {
        const statusUpdated = await axios.post(ADMIN_URI+'update-status/'+id+'/'+!status)
        return statusUpdated.data
    } catch (e) {
        throw e
    }
}