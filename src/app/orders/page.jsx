'use client'
import { getOrders } from "@/services/homeService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function OrdersPage(){
    const [filter, setFilter] = useState(null)
    const [orders, setOrders] = useState(null)
    const router = useRouter()

    const getAllOrders = async () => {
        try {
            const Orders = await getOrders(filter)
            setOrders(Orders)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [filter])

return(
    <div className="grid grid-cols-1 gap-6 p-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-semibold">Ordenes</h1>
                <span className="text-lg font-light">{orders?.length} ordenes encontradas</span>
            </div>
            <div className='flex items-center space-x-2 bg-white p-2 w-1/3 rounded-lg'>
                <MagnifyingGlassIcon className='w-5 h-5' fill='gray'/>
                <input  className='focus:outline-none w-full font-base' placeholder='¿Que estas buscando?' type="text"/>
            </div>
        </div>

        <div className="flex items-center my-2">

            <button className={`text-base text-light py-[0.15rem] mr-4 
            ${filter == null ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(null)}>
                Todas las ordenes
            </button>

            <button className={`text-base text-light py-[0.15rem] mr-4 
            ${filter == false ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(false)}>
                Pendientes
            </button>

            <button className={`text-base text-light py-[0.15rem] mr-4 
            ${filter == true ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(true)}>
                Despachadas
            </button>
        </div>

        <table className="w-full text-left rounded-lg border-collapse overflow-hidden">
            <thead className="text-xs text-white uppercase bg-black">
                <tr>
                    <th scope="col" className="p-4">ID</th>
                    <th className="p-4">Nombre</th>
                    <th className="p-4 w-1/4">Dirección</th>
                    <th className="p-4">Fecha</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Total</th>
                </tr>
            </thead>
            <tbody>
                {orders && orders.length > 0 &&
                orders.map((order, i) => {
                    return(
                    <tr key={i} onClick={() => router.push('/orders/'+order._id)} className="text-sm hover:bg-white/25 cursor-pointer">
                        <td className="p-4">#{order._id}</td>
                        <td className="p-4">{order.shippingInfo.name+' '+order.shippingInfo.surname}</td>
                        <td className="p-4 w-24 truncate overflow-hidden">{order.shippingInfo.address}</td>
                        <td className="p-4">{order.createdAt.split("T")[0]}</td>
                        <td className="p-4 flex items-center">
                        <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                            Pendiente
                        </td>
                        <td className="p-4">{order.totalPrice}</td>
                    </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    )
}