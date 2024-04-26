import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../loader'
import Error from '../error404'
import Product from '../product/product'
import { getAllProducts, getProductsByCategory } from '../../services/products'

import {ExclamationCircleIcon} from '@heroicons/react/24/solid'

const ProductsComponent = (filters) => {
    const [products, setProducts] = useState()
    const [isLoaded, setIsLoaded] = useState(null)
    const [error, setError] = useState(null)
    const {cat} = useParams()

    const getProducts = async () => {
        try {
           if (cat) {
            const productsByCategory = await getProductsByCategory(cat)
            setProducts(productsByCategory)
           }else{
            const Products = await getAllProducts(filters)
            setProducts(Products)
           }
           setIsLoaded(true)
        } catch (e) {
            if(e.response && e.response.status === 404){
                setError(404)
            }
        }
    }

    useEffect(() => {
        setProducts()
        setIsLoaded(false)
        setError(false)     
    }, [cat])

    if(error === true){
        return <Error/>
    }

    if(isLoaded === false && error === false){
        return <Loader/>
    }

    return(
        <div>
            <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products && products.length > 0 && products.map((product, i) => {
                return <Product key={i} product={product}/>
            })}
            </div>

            {error === 404 &&
                <div className='w-full h-screen'>
                    <div className=''>
                        <div className='flex justify-center items-center'>
                        <ExclamationCircleIcon className='w-12 h-12' fill='gray'/>
                        </div>
                        <h1 className='text-center text-xl text-center text-gray-500'>No se encontraron resultados</h1>
                    </div>
                </div>
            }

        </div>
    )
}

export default ProductsComponent