import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../loader'
import Error from '../error404'
import Product from '../product/product'
import { URL } from '../../global'


const ProductsComponent = () => {
    const [products, setProducts] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)
    const {cat} = useParams()


    useEffect(() => {
        setError(false)
        axios.post(URL+'products/', {category: cat}).then(res => {
            setError(false)
            setIsLoaded(true)
            setProducts(res.data)
        }).catch(e => {if (e.response.status == 500 || e.response.status == 404) setError(true)})
    }, [cat])

    if(error === true){
        return <Error/>
    }

    if(isLoaded === false && error === false){
        return <Loader/>
    }

    return(
        <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, i) => {
                return <Product key={i} img={product.imgs[0].url} brand={product.brand} name={product.name} price={product.price} id={product._id} />
            })}
        </div>
    )
}

export default ProductsComponent