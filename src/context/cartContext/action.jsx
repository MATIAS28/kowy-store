export const addProduct = (dispatch, p, size, cart) => {
    let product = {
        _id: p._id,
        img: p.imgs[0].url,
        brand: p.brand,
        description: p.description,
        name: p.name,
        size: size,
        unit_price: p.price,
        quantity: 1
    }

    let products = []

    const find = cart.find((item) => p._id === item._id && item.size === size)

    if (find) {
        let filter = cart.filter((item) => item !== find)
        find.quantity++
        products = [...filter, find]
    }else{
        products = [...cart, product]
    }
    
    
    dispatch({type: 'ADD_PRODUCT', products: products, total: product.unit_price*product.quantity})
}

export const removeProduct = async (cart, product, dispatch, total) => {
    const filter = await cart.filter((item) => item !== product)
    const subtraction = total-(product.unit_price*product.quantity)
    dispatch({type: 'REMOVE_CART', products: filter, total: subtraction})
}


export const addOrRemoveProduct = async (cart, product, dispatch, update, total) => {
    let subtraction;
    const index = await cart.findIndex((item) => item._id == product._id)

    if (update) {
        cart[index].quantity = product.quantity+1
        subtraction = total+product.unit_price
    }else{
        cart[index].quantity = product.quantity-1
        subtraction = total-product.unit_price
    }

    dispatch({type: 'UPDATE_CART', products: cart, total: subtraction})
}