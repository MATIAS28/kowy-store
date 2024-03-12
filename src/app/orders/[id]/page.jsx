'use client'
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
        return <h1>holas</h1>
    }

    return(
        <div className="p-4">
            <Toaster position="top-right" reverseOrder={false}/>

            <div className="grid grid-cols-1 gap-12 w-full bg-white/25 p-4 rounded-xl drop-shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xl">Orden ID: #{order._id}</span>
                        <span className="text-sm text-gray-700 font-semibold">{order.createdAt}</span>
                    </div>
                    <div className="flex items-center divide-x">

                    <button onClick={() => handlerUpdate(false)} 
                    className={`flex items-center text-xs font-semibold px-4 py-2 rounded-l-xl
                    ${!order.delivered ? 'primary' : 'bg-white'}`}>
                        Pendiente
                    </button>

                    <button onClick={() => handlerUpdate(true)} 
                    className={`flex items-center text-xs font-semibold px-4 py-2 rounded-r-xl
                    ${order.delivered ? 'primary' : 'bg-white'}`}>
                        Enviado
                    </button>

                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="mr-4">
                        <UserIcon className="w-16 h-16 primary p-4 rounded-full"/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-semibold text-gray-700">Usuario</span>
                            <span className="text-lg">Nombre: {order.shippingInfo.name+' '+order.shippingInfo.surname}</span>
                            <span className="text-lg">Email: matias@matias.com</span>
                            <span className="text-lg">Telefono: {order.shippingInfo.phone_number}</span>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="mr-4">
                        <TruckIcon className="w-16 h-16 primary p-4 rounded-full"/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-semibold text-gray-700">Información de envío</span>
                            <span className="text-lg">Dirección: {order.shippingInfo.address}</span>
                            <span className="text-lg">Departameto: {order.shippingInfo.province}</span>
                            <span className="text-lg">Departameto: {order.shippingInfo.locality}</span>
                            <span className="text-lg">Código postal: {order.shippingInfo.post_code}</span>
                        </div>
                    </div>
                </div>

            <div className="">
                    <span className="text-lg font-seibold">Productos</span>
            <table className="w-full text-left rounded-t-lg border-collapse overflow-hidden my-4">
            <thead className="text-xs uppercase bg-white/50">
                <tr>
                    <th className="p-4">Nombre</th>
                    <th className="p-4 w-1/4">Talle</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Cantidad</th>
                </tr>
            </thead>

            <tbody>
                {order.products.length > 0 && 
                order.products.map((product, i) => {
                    return(
                        <tr key={i} className="text-sm hover:bg-white/25 cursor-pointer">
                        <td className="flex items-center p-4">
                        <img className="w-12 h-12 mr-2 rounded-lg" 
                        src={product.img} alt="" />
                        <div className="flex flex-col">
                        <span className="text-sm font-semibold">{product.brand}</span>
                        <span className="text-lg font-light">{product.name}</span>
                        </div>
                        </td>
                        <td className="p-4">{product.size}</td>
                        <td className="p-4 w-24 truncate overflow-hidden">{product.unit_price}</td>
                        <td className="p-4">{product.quantity}</td>
                    </tr>
                    )
                })}
            </tbody>

        </table>
                </div>

            </div>
        </div>
    )
}