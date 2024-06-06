'use client'
import { getGeneralStatistics } from "@/services/homeService"
import {ChartBarIcon, TruckIcon, UserIcon, ShoppingCartIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon} from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { LoaderComponent } from "../loader"

export const StatisticsComponent = () => {
    const [statistics, setStatistics] = useState(null)
    const [days, setDays] = useState(28)
    const getStatistics = async () => {
        try {
            const Statistics = await getGeneralStatistics(days)
            setStatistics(Statistics)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getStatistics()
    }, [days])

    return(
        <div>
            <div className="flex justify-between items-center py-1">
                <h4 className="text-xl">Estadísticas generales</h4>
                <div className="flex items-start">
                    <button onClick={() => setDays(28)} 
                    className={`text-xs border-black py-1 mr-2 ${days == 28 ? 'border-b-2' : ''}`}>
                        28 dias
                    </button>
                    <button onClick={() => setDays(7)} 
                    className={`text-xs border-black py-1 ${days == 7 ? 'border-b-2' : ''}`}>
                        7 dias
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 my-4">
                <div className="h-48 w-full bg-white p-4 w-full rounded">
                {statistics && 
                    <div>
                        <div className="bg-black p-2 w-fit rounded-full">
                            <ChartBarIcon className="w-5 h-5 m-2 fill-white"/>
                        </div>
                        <div className="flex flex-col mt-4">
                            <span className="text-xs text-gray-500 font-semibold">Ganancias totales</span>
                            <span className="text-lg font-semibold my-1">${statistics.sales.lastSales}</span>
                        </div>
                        <div className="flex items-start my-2">
                            {statistics.sales.salesStats > 0 ?
                                <ArrowTrendingUpIcon className="w-4 h-4 mr-2 fill-green-500"/>
                                :
                                <ArrowTrendingDownIcon className="w-4 h-4 mr-2 fill-red-500"/>
                            }
                            <span className="text-[0.56rem] text-gray-600 w-full">
                                {statistics.sales.salesStats+"% de aumento respecto a los ultimos "+days+" dias"}
                            </span>
                        </div>
                    </div>
                }
                </div>

                <div className="h-48 w-full bg-white p-4 w-full rounded">
                {statistics && 
                    <div>
                        <div className="bg-black p-2 w-fit rounded-full">
                            <TruckIcon className="w-5 h-5 m-2 fill-white"/>
                        </div>
                        <div className="flex flex-col mt-4">
                            <span className="text-xs text-gray-500 font-semibold">Ordenes pendientes</span>
                            <span className="text-lg font-semibold my-1">{statistics.orders.orderCount}</span>
                        </div>
                        <div className="flex items-start my-2">
                            {statistics.orders.ordersStats > 0 ?
                                <ArrowTrendingUpIcon className="w-4 h-4 mr-2 fill-green-500"/>
                                :
                                <ArrowTrendingDownIcon className="w-4 h-4 mr-2 fill-red-500"/>
                            }
                            <span className="text-[0.56rem] text-gray-600 w-full">
                                {statistics.orders.ordersStats+"% de aumento respecto a los ultimos "+days+" dias"}
                            </span>
                        </div>
                    </div>
                }
                </div>

                <div className="h-48 w-full bg-white p-4 w-full rounded">
                    {statistics && 
                    <div>
                        <div className="bg-black p-2 w-fit rounded-full">
                            <UserIcon className="w-5 h-5 m-2 fill-white"/>
                        </div>
                        <div className="flex flex-col mt-4">
                            <span className="text-xs text-gray-500 font-semibold">Usuarios</span>
                            <span className="text-lg font-semibold my-1">{statistics.users.usersCount}</span>
                        </div>
                        <div className="flex items-start my-2">
                            {statistics.users.usersStats > 0 ?
                                <ArrowTrendingUpIcon className="w-4 h-4 mr-2 fill-green-500"/>
                                :
                                <ArrowTrendingDownIcon className="w-4 h-4 mr-2 fill-red-500"/>
                            }
                            <span className="text-[0.56rem] text-gray-600 w-full">
                                {statistics.users.usersStats+"% de aumento respecto a los ultimos "+days+" dias"}
                            </span>
                        </div>
                    </div>
                    }
                </div>

                <div className="h-48 w-full bg-white p-4 w-full rounded">
                    {statistics && 
                    <div>
                        <div className="bg-black p-2 w-fit rounded-full">
                            <ShoppingCartIcon className="w-5 h-5 m-2 fill-white"/>
                        </div>
                        <div className="flex flex-col my-4">
                            <span className="text-xs text-gray-500 font-semibold">Productos</span>
                            <span className="text-lg font-semibold my-1">{statistics.products}</span>
                        </div>
                    </div>
                    }
                </div>

            </div>

        </div>
    )
}