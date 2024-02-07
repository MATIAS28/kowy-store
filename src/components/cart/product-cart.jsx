import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { TrashIcon } from "@heroicons/react/24/solid"
import { cartContext } from "../../context/cartContext/cartContext"
import { removeProduct } from "../../context/cartContext/action"


export const ProductCart = ({product, color, pay}) => {
    const {cart, dispatch, total} = useContext(cartContext)
    return(
        <div className="flex items-center my-2">
            <Link className="duration-150 hover:border w-full" to={'/product/'+product._id}>
            <li className="flex items-center p-2 max-h-20 justify-between">

            <img src={product.img} className="h-14 w-16 rounded-lg" alt="" />

            <div className="flex flex-col mx-2 w-full space-y-1 h-16">
            
            <div>
            <p className="text-xs text-semibold font-semibold secondaryColor">{product.brand}</p>
            <p className="text-sm text-semibold font-semibold">{product.name}</p>
            </div>

            <div className="flex items-center bg-black w-fit space-x-3 px-3 py-1 rounded-lg">
                <p className="text-xs text-white font-semibold">
                    talle: {product.size}
                </p>

                <p className="text-xs text-white font-semibold">
                    X{product.quantity}
                </p>
            </div>

            </div>
            
            <div>
                <p className="text-sm mr-1  p-1 text-center">
                    ${product.unit_price}
                </p>
            </div>
           
            </li>
            </Link>

            <div className="flex items-center">
            <button style={{color: color ? '' : 'white'}} 
            className="rounded-full  text-bold text-xs p-2 ml-1" 
            onClick={() => removeProduct(cart, product, dispatch, total)}>
                <TrashIcon className="h-5 w-5" fill="black"/>
            </button>
            </div>

        </div>
    )
}