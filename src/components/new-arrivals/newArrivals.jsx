import { useEffect, useState } from "react"
import { getNewArrivals } from "../../services/products"
import { Link } from "react-router-dom"



export const NewArrivalsComponent = () => {
    const [error, setError] = useState(null)
    const [products, setProducts] = useState([])

    const getNewProducts = async () => {
        try {
            const newProducts = await getNewArrivals(3)
            setProducts(newProducts)
        } catch (e) {
            setError(e)
            console.log(e);
        }
    }

    useEffect(() => {
        getNewProducts()
    }, [])

    return(
        <div  className="flex items-center justify-center my-4 w-full primary h-full py-8 md:py-4">
            <div className="md:flex items-center w-4/5 sm:h-fit lg:h-[30rem]">

                <div className="relative flex-col w-full md:w-2/5 primary h-full lg:h-[24rem]">
                    <h4 className="text-lg md:text-xl secondaryColor font-semibold">Nuevos Ingresos</h4>
                    <p className="relative text-xs text-light md:text-base   my-3 my-3">
                        ¡Descubre la emoción de lo nuevo cada mes! 
                        Explora nuestras últimas creaciones y 
                        tendencias frescas que transformarán tu experiencia de compras. 
                        ¡Renovamos nuestra colección mensualmente para ofrecerte siempre 
                        lo mejor y más emocionante!
                    </p>

                    <div className="relative hidden md:flex items-center justify-center mt-4 w-full">
                    <Link to={{pathname:'/products', search: 'new-arrivals'}} 
                    className='bg-white uppercase p-2 rounded-3xl w-full text-xs font-semibold text-center'>
                        Nuevos ingresos
                    </Link>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full h-min-h-fit md:h-[24rem] md:p-2">

                    {products && products.length > 0 &&
                        products.map((product, i) => {
                            return(
                                <Link key={i} to={'/product/'+product._id} className="">
                                    <img key={i} className="w-full h-full rounded" src={product.imgs[0].url} alt=""/>
                                </Link>
                            )
                        })
                    }
                    

                </div>
                
                <div className="flex items-center justify-center md:hidden my-4 w-full">
                    <Link to={{pathname:'/products', search: 'new-arrivals'}} 
                        className='bg-white uppercase py-1 md:p-2 rounded-3xl w-full text-xs md:font-semibold text-center'>
                            Nuevos ingresos
                    </Link>
                </div>

            </div>
        </div>
    )
}