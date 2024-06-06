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
                <h1 className="text-3xl font-bold">Ordenes</h1>
                <span className="font-light text-gray-500">{orders?.length} ordenes encontradas</span>
            </div>
            <div className='flex items-center space-x-2 bg-white p-2 w-1/3 rounded-lg'>
                <MagnifyingGlassIcon className='w-6 h-6' fill='gray'/>
                
                <input  className='focus:outline-none w-full text-sm' 
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Buscar por ID' type="text"/>

                <button onClick={SearchOrder} className="text-xs px-2">Buscar</button>
            </div>
        </div>

        <div className="flex items-center my-4">
            <button className={`text-xs font-semibold py-[0.15rem] mr-4 
            ${filter == null ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(null)}>
                Todas las ordenes
            </button>

            <button className={`text-xs font-semibold py-[0.15rem] mr-4 
            ${filter == false ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(false)}>
                Pendientes
            </button>

            <button className={`text-xs font-semibold py-[0.15rem] mr-4 
            ${filter == true ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(true)}>
                Despachadas
            </button>
        </div>

        <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs font-semibold uppercase primary">
                <tr>
                    <th scope="col" class="px-4 py-3">ID</th>
                    <th scope="col" class="px-4 py-3">Nombre</th>
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
                        <td className="text-xs px-4 py-3">{order.shippingInfo.name+' '+order.shippingInfo.surname}</td>
                        <td className="text-xs px-4 py-3">{order.shippingInfo.address}</td>
                        <td className="text-xs px-4 py-3">{order.createdAt.split("T")[0]}</td>
                        <td className="text-xs px-4 py-3">
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
                        <td className="p-4 text-light">${order.totalPrice}</td>
                    </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>

        <div>
        {!orders && !error && <TableLoaderComponent/>}
        {error && <ErrorComponent name={'ordenes'}/>}
        </div>
    </div>
    )
}