'use client'
import { getPendingOrders } from "@/services/homeService"
import { useEffect, useState } from "react"


export const PendingOrdersComponent = () => {
    const [pendingOrders, setPendingOrders] = useState(null)

    const getOrders = async () => {
        try {
            const PendingOrders = await getPendingOrders()
            setPendingOrders(PendingOrders)
        } catch (e) {
            console.error(e)
        }
    }
    
    useEffect(() => {
        getOrders()
    }, [])

    if(!pendingOrders){
        return <div className="w-4/5 bg-white/25 overflow-y-auto h-[24rem] p-3 rounded-lg animate-pulse"></div>
    }

    return(
        <div className="w-4/5 h-[24rem] overflow-y-auto rounded border-2">
            
            <div className="p-4">
            <h4 className="text-lg font-semibold">Ordenes pendientes</h4>
            <p className="text-xs font-bold text-gray-500">Últimos pedidos registrados</p>
            </div>

            <table className="w-full text-left my-4">
                    <thead className="text-xs uppercase birder-b">
                        <tr>
                            <th scope="col" className="px-4 py-2 font-bold text-gray-900">ID</th>
                            <th className="px-4 py-2 font-bold text-gray-900">Productos</th>
                            <th className="px-4 py-2 font-bold text-gray-900">Fecha</th>
                            <th className="px-4 py-2 font-bold text-gray-900">Estatus</th>
                            <th className="px-4 py-2 font-bold text-gray-900">Total</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {pendingOrders && pendingOrders.length > 0 &&
                        pendingOrders.map((order, i) => {
                            return(
                            <tr key={i} className="text-xs">
                            <td className="px-4 text-xs font-light uppercase">#{order._id}</td>
                            <td className="px-4 text-xs font-light">{order.products.length} productos</td>
                            <td className="px-4 text-xs font-light">{order.createdAt.split("T")[0]}</td>
                            <td className="px-4 text-red-400 text-xs font-bold px-4 py-4 flex items-center">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                                Pendiente
                            </td>
                            <td className="px-4 text-xs font-light">${order.totalPrice}</td>
                            </tr>
                            )
                        })}                        
                    </tbody>
                </table>
        </div>
    )
}