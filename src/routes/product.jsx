import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import ArticleCarousel from '../components/article-carousel/article-carousel'
import Loader from '../components/loader'
import Error from '../components/error404'

import { ShoppingBagIcon} from '@heroicons/react/24/solid'

import { cartContext } from '../context/cartContext/cartContext'
import { addProduct } from '../context/cartContext/action'

import toast, { Toaster } from 'react-hot-toast';
import { getProduct } from '../services/products'


function ProductRoute (){
    const [product, setProduct] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [imgPreview, setImgPreview] = useState()
    const [sizeSelect, setSizeSelect] = useState(null)
    const {cart, dispatch} = useContext(cartContext)
    const {id} = useParams()

    const addProductHandler = () => {
        if (sizeSelect != null) {
            addProduct(dispatch, product, sizeSelect, cart)
        }else{
            toast('Selecciona un talle',
        {
                icon: '👕',
                style: {
                background: '#000',
                color: '#fff',
                },
            }
         );
        }
    }

    useEffect(() => {
            const handleGetProduct = async () => {
                try {
                    const Product = await getProduct(id)
                    setIsLoaded(true)
                    setProduct(Product)
                    setImgPreview(Product.imgs[0].url)
                } catch (e) {
                    setError(true)
                }
            }
            handleGetProduct()
    }, [id])

    if (error === true) {
        return <Error/>
    }

    if (isLoaded === false && error === false) {
       return <Loader/>
    }
    
    return(
    <div className='bg-gray-100'>
        <Toaster position="bottom-right" reverseOrder={false}/>
    <div id='container' className="rounded md:flex flex-row">
        <div className="flex justify-center basis-4/5">
            <img id='product-img' className="w-full h-80 md:h-[40rem]" src={imgPreview} alt="" />
        </div>

        <div className='block md:hidden mx-2 md:mx-5'>
            <ul className="grid grid-cols-4 gap-3 my-5">
            {product && product.imgs.map((img, i) => {
                return(
                <li onClick={() => setImgPreview(img.url)} key={i} className="mr-2 cursor-pointer">
                    <img className='rounded w-20 h-20' src={img.url} alt="" />
                </li>
                )
            })}
            </ul>
        </div>

        <div className="m-2 md:m-5 basis-2/5">
            <h3 className='my-2 text-sm font-medium secondaryColor'>{product.brand}</h3>
            <h1 className="text-4xl font-bold m-0 p-0">{product.name}</h1>
            <div className="my-4 items-center">

                <div className='my-4'>
                <p className="text-sm font-semibold">Elige un talle</p>
                <ul className="grid max-w-6xl  grid-cols-4 gap-6 my-4 w-4/5 h-28">
                {product && product.sizes.map((size, i) => {
                return(
                    <li key={i} 
                    className={`flex items-center justify-center cursor-pointer w-14 h-9 rounded duration-150
                    ${size.size === sizeSelect ? 'shadow-lg bg-black text-white font-semibold' : ''}`}
                    onClick={() => setSizeSelect(size.size)}>
                        <span className='text-lg'>{size.size}</span>
                    </li>
                )
                })}
                </ul>
                </div>
            </div>
            
            <div className="">
                
                <div className='flex items-center my-4'>
                    <button className="button-jello w-full flex items-center justify-center rounded-xl bg-black text-white font-semibold py-2 mr-3" 
                    onClick={addProductHandler}>
                    <ShoppingBagIcon className="h-5 w-5  mr-2 "/>
                        Añadir al carrito
                    </button>

                    <p className="text-lg my-3 font-semibold">{'$'+product.price}</p>
                </div>

                <div className='hidden md:block'>
                <ul className="flex my-5">
                {product && product.imgs.map((img, i) => {
                    return(
                    <li onClick={() => setImgPreview(img.url)} key={i} className="mr-2 cursor-pointer">
                        <img className='rounded w-20 h-20' src={img.url} alt="" />
                    </li>
                    )
                })}
                </ul>
                </div>

                <div className='my-3 space-y-2'>
                    <span className='text-sm font-semibold'>Descripcion</span>
                    <p className="text-gray-600">{product.description}</p>
                </div>

            </div>
        </div>
    </div>

    <ArticleCarousel cat={product.category}/>
    </div>
    )
}

export default ProductRoute