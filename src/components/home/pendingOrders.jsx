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
        <div className="w-4/5 bg-white/25 overflow-y-auto h-[24rem] p-3 rounded-lg">
            <div className="flex justify-between items-center">
                <h4 className="text-xl font-light">Ordenes pendientes</h4>
                <div className="flex items-center primary space-x-2 px-3 py-1 rounded-lg">
                    <span className="text-sm font-semibold">Nuevos</span>
                    <span className="text-xs font-semibold bg-white p-1 rounded-full">10</span>
                </div>
            </div>

            <table className="w-full text-left my-4">
                    <thead className="text-xs uppercase border-b border-black">
                        <tr>
                            <th scope="col" className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Productos</th>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Estatus</th>
                            <th className="px-4 py-2">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pendingOrders && pendingOrders.length > 0 &&
                        pendingOrders.map((order, i) => {
                            return(
                            <tr key={i} className="text-xs">
                            <td className="px-4 py-2 uppercase">#{order._id}</td>
                            <td className="px-4 py-2">{order.products.length} productos</td>
                            <td className="px-4 py-2">{order.createdAt.split("T")[0]}</td>
                            <td className="px-4 py-4 flex items-center">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                                Pendiente
                            </td>
                            <td className="px-4 py-2">${order.totalPrice}</td>
                            </tr>
                            )
                        })}                        
                    </tbody>
                </table>
        </div>
    )
}