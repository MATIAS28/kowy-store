import Filters from "../components/products/filters"
import { useEffect, useState } from "react"
import { getAllProducts, getNewArrivals } from "../services/products"
import Product from "../components/product/product"
import Loader from "../components/loader"
import { FunnelIcon } from '@heroicons/react/24/solid'
import { useLocation } from "react-router-dom"
import { NotFoundComponent } from "../components/notFound"

function Products ({params}){
    const location = useLocation().search.slice(1)
    const [products, setProducts] = useState()
    const [isLoaded, setIsLoaded] = useState(null)
    const [error, setError] = useState(null)
    const [showFiltersMobile, setShowFiltersMobile] = useState(false)
    const [filters, setFilters] = useState(
        {
            category: [location],
            brand: [],
        }
    )

    const getProducts = async () => {
        try {
            const Products = await getAllProducts(filters)
            if (Products.length === 0) setError(true)
            setProducts(Products)
            setIsLoaded(true)
        } catch (e) {
            if(e.response && e.response.status === 404){
                setError(404)
            }
        }
    }

    const handlerNewArrivals = async () => {
        try {
            const newArrivals = await getNewArrivals()
            if (newArrivals.length === 0) setError(true)
            setProducts(newArrivals)
            setIsLoaded(true)
        } catch (e) {
            console.log(e);
        }
    } 

    useEffect(() => {
        setIsLoaded(false)
        setError(false)
        setProducts() 
        
        if (filters.category.includes('new-arrivals')) {
            handlerNewArrivals()
        }else{
            getProducts() 
        }
        
    }, [filters])

   /*if (showFiltersMobile) {
        return <Filters filters={filters} setFilters={setFilters} 
        setShowFiltersMobile={setShowFiltersMobile} location={location} />
    }*/

    return(
    <div className="block w-full p-2">
        <div className="flex justify-center ip-5 my-7">
            <div>
            <h2 className="text-center text-3xl md:text-4xl text-bold">Catalogo</h2>
            <h3 className="text-center text-sm md:text-lg text-gray-500">
                Descubre el estilo que te define en nuestro catálogo 
            </h3>
            </div>
        </div>

        <div className="md:flex justify-around my-12">

            <div className="flex md:hidden justify-between items-center w-full my-4">
                <button onClick={() => setShowFiltersMobile(prev => !prev)}
                className="flex items-center bg-neutral-950 py-1 px-5 text-lg rounded-lg">
                    <span className="text-white text-sm mr-2 font-semibold">Filtrar</span>
                    <FunnelIcon className="w-5 h-5 fill-white"/>
                </button>

                <button className="primary font-semibold py-1 px-5 rounded-lg"
                onClick={() => setFilters({ category: ['new-arrivals'], brand: [] })}>
                    <span className="text-sm mr-2">Nuevo</span>
                </button>
            </div>

            <div className="hidden md:flex w-2/5 lg:w-1/4 h-full mx-7">
                <Filters filters={filters} setFilters={setFilters} location={location} />
            </div> 

            <div className={`w-full h-full
                ${showFiltersMobile ? '' : 'hidden'}`}>
                <Filters filters={filters} setFilters={setFilters} 
                setShowFiltersMobile={setShowFiltersMobile} location={location}/>
            </div> 


            <div className={`${products && products.length > 0 &&  !showFiltersMobile ? '' : 'hidden'} w-full`}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 px-0 md:px-4">
                {products && products.length > 0 && products.map((product, i) => {
                    return <Product key={i} product={product}/>
                })}

                </div>
            </div>

            {error && 
                <NotFoundComponent name={'Productos'}/>
            }

            {!isLoaded && !error &&
            <div className="w-full">
                <Loader/>
            </div>
            }

        </div>
     </div>
    )
}

export default Products