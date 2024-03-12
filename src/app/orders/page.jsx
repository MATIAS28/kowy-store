'use client'
import { ErrorComponent } from "@/components/error";
import { TableLoaderComponent } from "@/components/tableLoader";
import { getOrders } from "@/services/homeService";
import { getOrderById } from "@/services/ordersService";
import { CheckCircleIcon, ExclamationCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function OrdersPage(){
    const [filter, setFilter] = useState(null)
    const [orders, setOrders] = useState()
    const [error, setError] = useState()
    const [search, setSearch] = useState()
    const router = useRouter()

    const getAllOrders = async () => {
        try {
            const Orders = await getOrders(filter)
            setOrders(Orders)
            if(Orders.length == 0) setError(true)
        } catch (e) {
            setError(true)
            console.error(e);
        }
    }

    const SearchOrder = async () => {
        setError(false)
        setFilter(NaN)
        setOrders()
        try {
            console.log(search);
            const order = await getOrderById(search)
            setOrders(order)
            if(order.length == 0) setError(true)
        } catch (e) {
            setError(true)
            console.error(e);
        }
    }

    useEffect(() => {
        setOrders(null)
        setError(false)
        getAllOrders()
    }, [filter])

return(
    <div className="grid grid-cols-1 p-4">
        <div className="flex items-center justify-between my-4">
            <div>
                <h1 className="text-3xl font-semibold">Ordenes</h1>
                <span className="text-lg text-gray-700">{orders?.length} ordenes encontradas</span>
            </div>
            <div className='flex items-center space-x-2 bg-white p-2 w-1/3 rounded-lg'>
                <MagnifyingGlassIcon className='w-6 h-6' fill='gray'/>
                
                <input  className='focus:outline-none w-full font-base' 
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Buscar por ID' type="text"/>

                <button onClick={SearchOrder} className="text-xs">Buscar</button>
            </div>
        </div>

        <div className="flex items-center my-4">
            <button className={`text-sm font-semibold py-[0.15rem] mr-4 
            ${filter == null ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(null)}>
                Todas las ordenes
            </button>

            <button className={`text-sm font-semibold py-[0.15rem] mr-4 
            ${filter == false ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(false)}>
                Pendientes
            </button>

            <button className={`text-sm font-semibold py-[0.15rem] mr-4 
            ${filter == true ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(true)}>
                Despachadas
            </button>
        </div>

        <table className="w-full text-left rounded-t-lg border-collapse overflow-hidden h-fit">
            <thead className="text-xs uppercase bg-white/50">
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
                        {order.delivered ? 
                            <div className="flex items-center">
                                <CheckCircleIcon className="w-4 h-4 fill-blue-500 mr-1"/>
                                <span>Enviado</span>
                            </div>
                            :
                            <div className="flex items-center">
                                <ExclamationCircleIcon className="w-4 h-4 fill-red-700 mr-1 animate-pulse"/>
                                <span>Pendiente</span>
                            </div>
                            
                        }
                        </td>
                        <td className="p-4">{order.totalPrice}</td>
                    </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <div>
        {!orders && !error && <TableLoaderComponent/>}
        {error && <ErrorComponent name={'ordenes'}/>}
        </div>
    </div>
    )
}