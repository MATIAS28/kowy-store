import { useContext } from "react"
import { cartContext } from "../../context/cartContext/cartContext"
import { ProductCart } from "../cart/product-cart"

export const SummaryComponent  = () => {
    const {cart} = useContext(cartContext)
    return(
        <div className="flex flex-col w-2/4">
        {cart.map((product, i) => {
            return <ProductCart key={i} product={product} color={true}/>
        })}
        </div>
    )
}