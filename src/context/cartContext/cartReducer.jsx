const cart = JSON.parse(localStorage.getItem('cart')) || false
export const cartState = {
    cart: cart.cart || [],
    total: cart.total || 0
}

export function cartReducer(cartState, action){
    switch(action.type){
        case 'ADD_PRODUCT':
            return {
                cart: action.products,
                total: cartState.total + action.total
            }

        case 'RESET_CART':
            return {
                cart: [],
                total: 0
            }

        case 'UPDATE_CART':
            return {
                cart: action.products,
                total: action.total
            }

        case 'REMOVE_CART':
            return{
                cart: action.products,
                total: action.products.length == 0 ? 0 : action.total
            }

        default:
            console.log('ACCION INVALIDA')
    }
}