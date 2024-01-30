import { useContext, useEffect, useState } from "react"
import { cartContext } from "../../context/cartContext/cartContext";
import axios from "axios";
import { ProductCart } from "../cart/product-cart";
import { Toaster, toast } from "react-hot-toast";
import { URL } from "../../global";

export const Pay = ({shippingInfo, token, user}) => {
    const {cart, total, dispatch} =  useContext(cartContext)
    const [link, setLink] = useState()
    
    const getPayLink = async () => {
        toast.loading('Espera...')
        const Link = await  axios.post(URL+'order', {shippingInfo: shippingInfo, products: cart, user: user, totalPrice: total}, {headers:{'auth-token': token}})
        setLink(Link.data)
    }

    useEffect(() => {
       if(link){
        dispatch({type: 'RESET_CART'})
        window.location.href = link
       }
    }, [link])

    return(
<div id="pay-container" className="w-full mb-2">

    {/*Toast*/}
    <Toaster toastOptions={{className: '', duration: 5000, style: {background: '#16a34a', marginTop: '10%', color: 'white',}}} position="bottom-center" reverseOrder={false}/>

    <div id="infoPay" className="flex justify-between">

            {/*Informacion de envio*/}
            <div id="shipping" className="w-full p-3">
                <h3 className="text-2xl font-semibold text-white">Informacion de envio</h3>

                <div className="text-lg divide-y">
                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-lg font-semibold text-white">Nombre</dt>
                    <dd className="text-sm font-normal primaryColor">{shippingInfo.name+' '+shippingInfo.surname}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-lg font-semibold text-white">DNI</dt>
                    <dd className="mt-1 text-sm font-normal primaryColor base:col-span-2 base:mt-0">{shippingInfo.dni}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-lg font-semibold text-white">Numero de telefono</dt>
                    <dd className="mt-1 text-sm font-normal primaryColor base:col-span-2 base:mt-0">{shippingInfo.phone_number}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-lg font-semibold text-white">Provincia</dt>
                    <dd className="mt-1 text-sm font-normal primaryColor base:col-span-2 base:mt-0">{shippingInfo.province}</dd>
                    </div>


                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-lg font-semibold text-white">Localidad</dt>
                    <dd className="mt-1 text-sm font-normal primaryColor base:col-span-2 base:mt-0">{shippingInfo.locality}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-lg font-semibold text-white">Barrio</dt>
                    <dd className="mt-1 text-sm font-normal primaryColor base:col-span-2 base:mt-0">{shippingInfo.neighborhood}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-lg font-semibold text-white">Direccion</dt>
                    <dd className="mt-1 text-sm font-normal primaryColor base:col-span-2 base:mt-0">{shippingInfo.address}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-lg font-semibold text-white">Codigo Postal</dt>
                    <dd className="mt-1 text-sm font-normal primaryColor base:col-span-2 base:mt-0">{shippingInfo.post_code}</dd>
                    </div>
                    
                </div>
            </div>

            {/*Productos del carrito*/}
            
            <div id="products" 
            className="bg-black p-3 border border-gray-600 flex-col rounded-lg w-3/5 h-full dropshadow-lg">
                <div className="">
                <h3 className="text-xl font-semibold text-white my-2">Productos</h3>
                    <ul className={cart.length > 2 ? 'flex flex-col overflow-y-scroll h-[12.5rem] bg-white rounded-lg' : 'flex flex-col'}>
                        {cart.length > 0 && cart.map((product, i) => {

                        return(
                            <ProductCart key={i} product={product} color={false} pay={true}/>
                        )
                        })}
                    </ul>
                </div>

                {/*Informacion del pago*/}

                <div className="mb-1 text-lg p-2 text-white ">
                    <div className="flex justify-between mb-2">
                    <dt className="text-sm font-semibold">Subtotal</dt>
                    <dd className="mt-1 text-xs font-normal base:col-span-2 base:mt-0">${total}</dd>
                    </div>

                    <div className="flex justify-between mb-2">
                    <dt className="text-sm font-semibold">Envio</dt>
                    <dd className="mt-1 text-xs font-normal base:col-span-2 base:mt-0">$0.5</dd>
                    </div>

                    <div className="flex justify-between mb-2">
                    <dt className="text-sm font-semibold">Total</dt>
                    <dd className="mt-1 text-xs font-normal base:col-span-2 base:mt-0">${total+0.5}</dd>
                    </div>
                    
                    <button onClick={getPayLink} disabled={!user ? false : true} 
                    className="rounded-3xl w-full p-1 primary text-center text-black my-2">
                            Pagar
                    </button>
                </div>
            
            </div>
    </div>

            <style jsx="true">
            {`
                @media(max-width: 768px){
                    #shipping{
                        width: 100%;
                    }

                    #pay-conatiner{
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        padding: 1rem;
                    }

                    #products{
                        margin-top: 1rem;
                        border: none;
                        padding: 1rem;
                        width: 100%;
                    }

                    #infoPay{
                        display: block;
                    }
                }
            `}
            </style>

        </div>
    )
}