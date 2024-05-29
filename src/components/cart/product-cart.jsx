import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { cartContext } from "../../context/cartContext/cartContext"
import { addOrRemoveProduct, removeProduct } from "../../context/cartContext/action"


export const ProductCart = ({product, color, pay}) => {
    const {cart, dispatch, total} = useContext(cartContext)
    return(
        <div className="flex items-center my-2 md:px-2 hover:bg-white/25">
            <li className="flex items-center p-2 max-h-20 justify-between w-full">

            <img src={product.img} className="h-14 w-16 rounded-lg" alt="" />

            <div className="flex flex-col mx-2 w-full h-16">
            <Link className="duration-150" to={'/product/'+product._id}>
            <div>
            <p className="text-xs font-semibold secondaryColor">{product.brand}</p>
            <p className="text-sm">{product.name}</p>
            </div>
            </Link>
            
            <div className="flex items-center w-fit rounded-lg mt-1">
                
                <button onClick={() => addOrRemoveProduct(cart, product, dispatch, true, total)} 
                className="bg-black p-1 rounded">
                <PlusIcon className="w-3 h-3 fill-white"/>
                </button>

                <span className="text-sm font-semibold mx-2">
                    X{product.quantity}
                </span>

                <button disabled={product.quantity < 2} className="bg-black p-1 rounded disabled:bg-black/25"
                onClick={() => addOrRemoveProduct(cart, product, dispatch, false, total)}>
                <MinusIcon className="w-3 h-3 fill-white"/>
                </button>
                
            </div>

            </div>
            
            <div className="p-1 mx-2 w-1/4">
                <p className="text-xs font-semibold text-center bg-black text-white rounded p-1">
                    {product.size}
                </p>
                <p className="text-xs text-center mt-2">
                    ${product.unit_price}
                </p>
            </div>
           
            </li>

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