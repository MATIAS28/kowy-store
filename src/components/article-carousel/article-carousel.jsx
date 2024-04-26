import { useState, useEffect } from 'react'
import Product from '../product/product'
import { ArticlesLoader } from '../articleLoader'
import { getProductsByCategory } from '../../services/products'

const ArticleCarousel = ({cat, limit}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [products, setProducts] = useState(null)
    const [error, setError] = useState(false)

    const getProducts = async () => {
        try {
            const Products = await getProductsByCategory(cat, limit)
            setIsLoaded(true)
            setProducts(Products)
        } catch (e) {
            setError()
        }
    }

    useEffect(() => {
        getProducts()
      }, [])

    
      if(error){
        return(
            <div className='flex justify-center'>
                <p className='text-3xl'>{error}</p>
            </div>
        )
      }
    return(
        <div className="mb-7 m-3 p-1">
            <div className="flex">
            <h1 className="text-4xl py-5 text-gray-700 font-bold mx-auto">{cat.toUpperCase()+'S'}</h1>
            </div>

            <div id='articles' className='mx-auto grid max-w-6xl w-full grid-cols-1 gap-6 md:p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {isLoaded && products && !error  ? 
                products.map((product, i) => {
                    return <Product key={i} product={product} />
                })
                :
                <ArticlesLoader/>
            }

            </div>

        <style jsx="true">
        {`
            @media (max-width: 768px){
                #articles{
                    grid-template-columns: repeat(1, minmax(0, 1fr));
                }
            }
        `}
        </style>

        </div>
    )
}

export default ArticleCarousel