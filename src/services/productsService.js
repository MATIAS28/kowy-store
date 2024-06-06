import axiosInstance from "../../utils/axiosConfig";

export const getAllProducts = async () => {
    try {
        const products = await axiosInstance.get('all-products')
        console.log(products);
        return products.data
    } catch (e) {
        throw e
    }
}

export const getProduct = async (id) => {
    try {
        const product = await axiosInstance.get('product/'+id)
        return product.data
    } catch (e) {
        throw e
    }
}

export const searchProduct = async (search) => {
    try {
        const products = await axiosInstance.post('search-product', {name: search})
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
        const productSaved = await axiosInstance.post('product', formData, 
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
        const productUpdated = await axiosInstance.post('update-product/'+product._id, formData,
        {headers: {'Content-Type': 'multipart/form-data'}})
        return productUpdated.data
    } catch (e) {
        throw e
    }

}


export const deleteProduct = async (id) => {
    try {
        const productDeleted = await axiosInstance.delete('product/'+id)
        return productDeleted.data
    } catch (e) {
        throw e
    }
}


export const updateStatus = async (id, status) => {
    try {
        const statusUpdated = await axiosInstance.post('update-status/'+id+'/'+!status)
        return statusUpdated.data
    } catch (e) {
        throw e
    }
}