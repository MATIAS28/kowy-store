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
        const order = {shippingInfo: shippingInfo, products: cart, user: user, totalPrice: total}
        const Link = await  axios.post(URL+'order', order, {headers:{'auth-token': token}})
        setLink(Link.data)
        console.log(order)
    }

    useEffect(() => {
       if(link){
        dispatch({type: 'RESET_CART'})
        window.location.href = link
       }
    }, [link])

    return(
<div id="pay-container" className="w-11/12 mb-2">

    {/*Toast*/}
    <Toaster toastOptions={{className: '', duration: 5000, style: {background: '#16a34a', marginTop: '10%', color: 'white',}}} position="bottom-center" reverseOrder={false}/>

    <div id="infoPay" className="flex justify-between">

            {/*Informacion de envio*/}
            <div id="shipping" className="w-full p-3">
                <h3 className="text-2xl font-semibold ">Informacion de envio</h3>

                <div className="text-lg divide-y">
                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-sm font-light">Nombre</dt>
                    <dd className="text-sm font-normal">{shippingInfo.name+' '+shippingInfo.surname}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-sm font-light">DNI</dt>
                    <dd className="mt-1 text-sm font-normal base:col-span-2 base:mt-0">{shippingInfo.dni}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-sm font-light">Numero de telefono</dt>
                    <dd className="mt-1 text-sm font-normal base:col-span-2 base:mt-0">{shippingInfo.phone_number}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-sm font-light">Provincia</dt>
                    <dd className="mt-1 text-sm font-normal base:col-span-2 base:mt-0">{shippingInfo.province}</dd>
                    </div>


                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-sm font-light">Localidad</dt>
                    <dd className="mt-1 text-sm font-normal base:col-span-2 base:mt-0">{shippingInfo.locality}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-sm font-light">Barrio</dt>
                    <dd className="mt-1 text-sm font-normal base:col-span-2 base:mt-0">{shippingInfo.neighborhood}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-sm font-light">Direccion</dt>
                    <dd className="mt-1 text-sm font-normal base:col-span-2 base:mt-0">{shippingInfo.address}</dd>
                    </div>

                    <div className="flex justify-between w-full items-center py-3 my-2">
                    <dt className="text-sm font-light">Codigo Postal</dt>
                    <dd className="mt-1 text-sm font-normal base:col-span-2 base:mt-0">{shippingInfo.post_code}</dd>
                    </div>
                    
                </div>
            </div>

            {/*Productos del carrito*/}
            
            <div className="flex-col w-full md:w-3/5">
                <div className="primary p-2 my-4 rounded-lg dropshadow">
                <h3 className="text-xl font-semibold my-2">Productos</h3>
                    <ul className={cart.length > 2 ? 'flex flex-col overflow-y-scroll h-[12.5rem] bg-white rounded-lg' : 'flex flex-col h-[12.5rem]'}>
                        {cart.length > 0 && cart.map((product, i) => {

                        return(
                            <ProductCart key={i} product={product} color={false} pay={true}/>
                        )
                        })}
                    </ul>
                </div>

                {/*Informacion del pago*/}

                <div className="bg-black rounded-lg mb-1 text-lg p-3  ">
                    <div className="flex justify-between mb-2">
                    <dt className="text-sm font-semibold text-white">Subtotal</dt>
                    <dd className="mt-1 text-sm font-normal text-white base:col-span-2 base:mt-0">${total}</dd>
                    </div>

                    <div className="flex justify-between mb-2">
                    <dt className="text-sm font-semibold text-white">Envio</dt>
                    <dd className="mt-1 text-sm font-normal text-white base:col-span-2 base:mt-0">$0.5</dd>
                    </div>

                    <div className="flex justify-between mb-2">
                    <dt className="text-sm font-semibold text-white">Total</dt>
                    <dd className="mt-1 text-sm font-normal text-white base:col-span-2 base:mt-0">${total+0.5}</dd>
                    </div>
                    
                    <button onClick={getPayLink} disabled={!user ? false : true} 
                    className="button-animation hover:p-2 rounded duration-150 w-full p-1 primary text-sm font-semibold my-2">
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
                        padding: 0.4rem;
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