import { createContext, useEffect, useReducer, useState } from "react"
import { cartReducer, cartState } from "./cartReducer"

export const cartContext = createContext()

export function CartProvider ({children}){
    const [cart, dispatch] = useReducer(cartReducer, cartState)
    const [expandCart, setExpandCart] = useState()
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify({cart: cart.cart, total: cart.total}))
    },[cart])
    const Cart = {...cart, dispatch, expandCart, setExpandCart}
    return <cartContext.Provider value={Cart}>
        {children}
    </cartContext.Provider>
}