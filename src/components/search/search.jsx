import { useEffect, useState } from "react"
import { searchProduct } from "../../services/products"
import Product from "../product/product"



export const SearchComponent = ({search}) => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const getProductsFound = async () => {
            try {
                const productsFound = await searchProduct(search)
                setProducts(productsFound)
            } catch (e) {
                console.log(e)
            }
        }

        getProductsFound()
    }, [search])

    return(
        <div>
            <h4 className="text-center text-3xl font-bold my-5">Resultados de tú búsqueda</h4>
            {products !== null && products.length ? 
                <div className='mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {products.map((product, i) => {
                    return <Product key={i} img={product.imgs[0].url} brand={product.brand} name={product.name} price={product.price} id={product._id} colors={product.colors} />
                })}
                </div>
                :
                <h5 className="text-center text-lg text-gray-500">No hubo resultados para tu búsqueda</h5>
            }

        </div>
    )
}