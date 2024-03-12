"use client"
import { getBestSellers } from '@/services/homeService'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export const BestSellersComponent = () => {
    const [bestSellers, setBestSellers] = useState(null)

    const getProducts = async () => {
        try {
            const products = await getBestSellers()
            setBestSellers(products)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    if(!bestSellers){
        return <div className="w-1/2 overflow-y-auto h-[24rem] p-3 bg-white/25 ml-3 p-3 rounded-lg animate-pulse"></div>
    }

    return(
        <div className="w-1/2 overflow-y-auto h-[24rem] p-3 primary ml-3 p-3 rounded-lg drop-shadow-lg">
            <h4 className="text-xl text-center font-light">Mas vendidos</h4>

            <div className="flex justify-between items-center mt-4 mb-2 border-b border-black mx-2">
                <span className="text-xs font-semibold">Producto</span>
                <span className="text-xs font-semibold">Unidades</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {bestSellers && bestSellers.length > 0 &&
                    bestSellers.map((product, i) => {
                        return(
                    <Link key={i} href={product._id} className="flex justify-between items-center w-full hover:bg-white/25 rounded-lg p-2">
                    <div className="flex items-center uppercase">
                        <img className="w-12 h-12 rounded" src={product?.img} alt="zapas"/>

                        <div className="flex flex-col mx-2">
                            <span className="text-xs text-gray-600 font-semibold">{product?.brand}</span>
                            <span className="text-lg font-light">{product?.name}</span>
                        </div>
                    </div>
                    <span className="text-lg text-end font-light">{product.totalSold}</span> 
                </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}