import { useContext, useEffect} from "react"
import { useLocation } from 'react-router-dom'
import { cartContext } from "../../context/cartContext/cartContext"

import { Link } from "react-router-dom"
import { ExclamationCircleIcon, ArrowRightCircleIcon} from "@heroicons/react/24/solid"
import { ProductCart } from "./product-cart"

function Cart(){
    const {cart, expandCart, setExpandCart, total} = useContext(cartContext)
    const location = useLocation()
    useEffect(() => {
        setExpandCart(false)
    }, [location])

    return(
      <aside id={expandCart} className='fixed cart right-0 w-1/3 duration-150 flex-col ease-in-out primary rounded-b shadow z-20'>
        
            <div className="p-2">
                <h3 className="text-xl text-center">Carrito</h3>
            </div>

            {
                cart.length === 0 && 
                <div className="flex items-center justify-center w-full h-[16rem] p-5">
                    <div className="flex flex-col items-center text-center">
                        <ExclamationCircleIcon className="w-9 h-9" fill="black"/>
                        <p className="w-full text-lg my-2">El carrito esta vacío</p>
                    </div>
                </div>
            }

        <ul className={`flex flex-col overflow-y-scroll ${cart.length > 0 ? 'h-[16rem]' : ''}`}>
            {cart.length > 0 && cart.map((product, i) => {
                
                return(
                   <ProductCart key={i} product={product} color={false}/>
                )
            })}
        </ul>

        <div className={cart.length > 0 ? '' : 'hidden'}>
            <div className="flex items-center justify-between p-2 my-2">
                <span className="text-lg font-bold">Total</span>
                <p className="text-lg font-bold">${total}</p>
            </div>

            <div className="w-full mt-4">
                <Link to='/order'>
                <button className="flex justify-center items-center w-full bg-black p-2 primaryColor text-lg text-bold rounded-b">
                    Iniciar Compra
                </button>
                </Link>
            </div>
        </div>

        <style jsx="true">
        {`
            .cart{
                -webkit-overflow-scrolling: touch;
                transform: translateX(100%);
            }

            #slide-in {
                animation: slide-in 0.4s forwards;
                -webkit-animation: slide-in 0.4s forwards;
            }
            
            #slide-out {
                animation: slide-out 0.4s forwards;
                -webkit-animation: slide-out 0.4s forwards;
            }
                
            @keyframes slide-in {
                100% { transform: translateX(0%); }
            }
            
            @-webkit-keyframes slide-in {
                100% { -webkit-transform: translateX(0%); }
            }
                
            @keyframes slide-out {
                0% { transform: translateX(0%); }
                100% { transform: translateX(100%); }
            }
            
            @-webkit-keyframes slide-out {
                0% { -webkit-transform: translateX(0%); }
                100% { -webkit-transform: translateX(100%); }
            }

            @media(max-width: 1000px){
                .cart{
                    width: 50%;
                }
            }

            @media(max-width: 790px){
                .cart{
                    width: 100%;
                }
            }
        `}
        </style>

      </aside>
    )
}

export default Cart