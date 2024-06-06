'use client'
import { useEffect, useState } from "react"
import { ErrorComponent } from "../error"
import { getUserOrders } from "@/services/usersServices"
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"



export const UserOrders = ({id}) => {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState()
    const router = useRouter()

    const handlerGetOrders = async () => {
        try {
            const Orders = await getUserOrders(id)
            console.log(Orders);
            setOrders(Orders)
        } catch (e) {
            setError(true)
            console.error(e);
        }
    }

    useEffect(() => {
        handlerGetOrders()
    }, [])

    return(
        <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs font-semibold uppercase primary">
                <tr>
                    <th scope="col" class="px-4 py-3">ID</th>
                    <th scope="col" class="px-4 py-3">Dirección</th>
                    <th scope="col" class="px-4 py-3">Fecha</th>
                    <th scope="col" class="px-4 py-3">Estado</th>
                    <th scope="col" class="px-4 py-3">Total</th>
                </tr>
            </thead>
            <tbody>
                {orders && orders.length > 0 &&
                orders.map((order, i) => {
                    return(
                    <tr key={i} onClick={() => router.push('/orders/'+order._id)} className="text-sm hover:bg-white/25 cursor-pointer">
                        <td className="text-xs px-4 py-3 uppercase">#{order._id}</td>
                        <td className="text-xs px-4 py-3">{order.shippingInfo.address}</td>
                        <td className="text-xs px-4 py-3">{order.createdAt.split("T")[0]}</td>
                        <td className="text-xs px-4 py-3 flex items-center">
                        {order.delivered ? 
                            <div className="flex items-center">
                                <CheckCircleIcon className="w-4 h-4 fill-blue-500 mr-1"/>
                                <span className="text-xs uppercase text-blue-500 font-semibold">Enviado</span>
                            </div>
                            :
                            <div className="flex items-center">
                                <ExclamationCircleIcon className="w-4 h-4 fill-red-500 mr-1 animate-pulse"/>
                                <span className="text-xs uppercase text-red-500 font-semibold">Pendiente</span>
                            </div>
                            
                        }
                        </td>
                        <td className="text-xs px-4 py-3">${order.totalPrice}</td>
                    </tr>
                        )
                    })
                }
            </tbody>
        </table>
        {error && <ErrorComponent name={'ordenes'}/>}
        </div>
    )
}