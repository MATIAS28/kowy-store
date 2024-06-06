'use client'
import { LoaderComponent } from "@/components/loader";
import { getOrderById, updateOrderStatus } from "@/services/ordersService";
import { TruckIcon, UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';



export default function OrderPage({params}){
    const [order, setOrder] = useState(null)
    
    const getOrder = async () => {
        try {
            const Order = await getOrderById(params.id)
            setOrder(Order[0])
        } catch (e) {
            console.error(e)
        }
    }

    const handlerUpdate = (status) => {
        toast((t) => (
            <div className="w-fit">
                <span className="font-light">
                ¿Estas seguro de actualizar el estado de la orden?
                </span>

                <button className="text-sm font-semibold rounded-xl mx-3"
                 onClick={() => updateOrder(status)}>
                    Si
                </button>

                <button className="text-sm font-semibold rounded-xl" 
                onClick={() => toast.dismiss(t.id)}>
                    No
                </button>
            </div>
          ));
    }

    const updateOrder = async (status) => {
        toast.dismiss()
        try {
            toast.loading('Waiting...');
            const Order = await updateOrderStatus(params.id, status)
            setOrder(Order)
            toast.dismiss()
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getOrder()
    }, [])

    if(!order){
        return <LoaderComponent/>
    }

    return(
        <div className="flex justify-between items-start h-screen p-4 mt-4">
            <div className="w-4/5 border rounded mr-2">
                <div className="flex justify-between p-4 border-b">
                    <div className="flex flex-col">
                        <span className="font-light mb-1">Orden #{order._id}</span>
                        <span className="text-sm text-gray-500 font-semibold">{order.createdAt}</span>
                    </div>

                    <div className="flex items-center divide-x">

                    <button onClick={() => handlerUpdate(false)} 
                    className={`flex items-center text-xs font-semibold px-4 py-2 rounded-l
                    ${!order.delivered ? 'primary' : 'bg-white'}`}>
                        Pendiente
                    </button>

                    <button onClick={() => handlerUpdate(true)} 
                    className={`flex items-center text-xs font-semibold px-4 py-2 rounded-r
                    ${order.delivered ? 'primary' : 'bg-white'}`}>
                        Enviado
                    </button>

                    </div>
                </div>
                
                <div className="w-full py-2">
                {order.products.length > 0 && 
                    order.products.map((product, i) => {
                        return(
                        <div key={i} className="flex justify-between items-center hover:bg-white/25 cursor-pointer px-4 rounded">
                            <div className="flex items-center py-4">
                                <img className="w-12 h-12 mr-2 rounded-lg" src={product.img} alt="" />
                                <div className="flex flex-col">
                                <span className="text-xs font-bold">{product.brand}</span>
                                <span className="text-sm">{product.name}</span>
                                <div className="flex items-center">
                                    <p className="text-xs text-gray-500 uppercase font-light mr-2">Talle: {product.size}</p>
                                    <p className="text-xs text-gray-500 uppercase font-light">Cantidad: {product.quantity}</p>
                                </div>
                                </div>
                            </div>
                            
                            <p className="text-sm font-semibold">${product.unit_price}</p>
                        </div>
                        )
                    })}
                </div>
            </div>

            

            <Toaster position="top-right" reverseOrder={false}/>

            <div className="w-3/5">
                <div className="bg-white rounded h-fit mb-4">
                    <div className="flex items-center mb-2 p-2 border-b">
                    <UserIcon className="w-5 h-5 fill-black rounded-full mr-2"/>
                    <span className="text-lg text-black font-semibold">Usuario</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-gray-500 p-2">
                        <span className="text-sm font-light">Nombre: {order.shippingInfo.name+' '+order.shippingInfo.surname}</span>
                        <span className="text-sm font-light">Email: matias@matias.com</span>
                        <span className="text-sm font-light">Telefono: {order.shippingInfo.phone_number}</span>
                    </div>
                </div>

                <div className="bg-white rounded h-fit">
                    <div className="flex items-center mb-2 p-2 border-b">
                    <TruckIcon className="w-5 h-5 fill-black rounded-full mr-2"/>
                    <span className="text-lg text-black font-semibold">Información de envío</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-gray-500 p-2">
                        <span className="col-span-2 text-sm font-light mb-2 text-black">Dirección: {order.shippingInfo.address}</span>
                        <span className="text-sm font-light">Departameto: {order.shippingInfo.province}</span>
                        <span className="text-sm font-light">Departameto: {order.shippingInfo.locality}</span>
                        <span className="text-sm font-light">Código postal: {order.shippingInfo.post_code}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}