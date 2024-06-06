'use client'
import { ErrorComponent } from "@/components/error"
import { ProductCardComponent } from "@/components/product/productCard"
import { ProductLoaderComponent } from "@/components/productLoader"
import { getAllProducts, searchProduct } from "@/services/productsService"
import { CheckCircleIcon, ExclamationCircleIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function ProductsPage (){
    const [filter, setFilter] = useState()
    const [products, setProducts] = useState()
    const [error, setError] = useState()
    const [search, setSearch] = useState()

    const getProducts = async () => {
        try {
            const Products = await getAllProducts()
            setProducts(Products)
        } catch (e) {
            setError(true)
            console.log(e);
        }
    }

    const handlerSearchProduct = async () => {
        setError(false)
        setFilter(NaN)
        setProducts(null)
        try {
            const Products = await searchProduct(search)
            console.log(Products);
            if (Products.length == 0) {
                setError(true)
            }else{
                setProducts(Products)
            }
        } catch (e) {
            setError(true)
            console.log(e);  
        }
    }

    useEffect(() => {
        setError()
        getProducts()
    }, [filter])

    return(
        <div className="grid grid-cols-1 p-4">
            <div className="flex items-center justify-between my-4">
                <div>
                    <h1 className="text-3xl font-semibold">Productos</h1>
                    <span className="text-lg text-gray-700">{products?.length} productos encontradas</span>
                </div>
                <div className='flex items-center space-x-2 bg-white p-2 w-1/3 rounded-lg'>
                    <MagnifyingGlassIcon className='w-6 h-6' fill='gray'/>
                    
                    <input onChange={(e) => setSearch(e.target.value)}  className='focus:outline-none w-full font-base' 
                    placeholder='Buscar por nombre' type="text"/>

                    <button onClick={() => handlerSearchProduct()} className="text-xs">
                        Buscar
                    </button>
                </div>
            </div>

        <div className="flex items-center my-4">
            <button className={`text-xs font-semibold py-[0.15rem] mr-4 
            ${filter == null ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(null)}>
                Todas los productos
            </button>

            <button className={`text-xs font-semibold py-[0.15rem] mr-4 
            ${filter == false ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(false)}>
                En descuento
            </button>

            <button className={`text-xs font-semibold py-[0.15rem] mr-4 
            ${filter == true ? 'border-b-2 border-black': ''}`}
            onClick={() => setFilter(true)}>
                Nuevos
            </button>
        </div>

        <div className="grid grid-cols-3 gap-6">

            <Link href={'/products/create-product'} className="flex justify-center w-80  items-center bg-gray-200 hover:shadow-md duration-150 rounded-lg cursor-pointer w-80">
            <PlusIcon className="w-28 h-12 fill-white"/>
            </Link>

            {error && <ErrorComponent name={'productos'}/>}

            {!products && !error && <ProductLoaderComponent/>}

            {products && products.length > 0 && !error &&
            products.map((product, i) => {
                return(
                    <ProductCardComponent id={product._id} img={product.imgs[0]?.url} 
                    brand={product.brand} name={product.name} price={product.price} key={i}/>
                )
            })}
        </div>

        </div>
    )
}