'use client'
import { ProductImgsComponent } from "@/components/product/productImgs";
import { getProduct } from "@/services/productsService"
import { ProductHandlerButton } from "@/components/buttons/productHandlerButton";
import { HashtagIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { ProductCategoriesComponent } from "@/components/product/productCategories";


export default function ProductPage ({params}){
    const [product, setProduct] = useState({})
    const [imgs, setImgs] = useState([])
    const [imgsDeleted, setImgsDeleted] = useState([])
    const [sizes, setSizes] = useState({size: "", quantity: 0})

    const handlerGetProduct = async () => {
        const toastId = toast.loading('Cargando producto')
        try {
            const Product = await getProduct(params.id)
            console.log(Product);
            toast.dismiss(toastId)
            setProduct(Product)
            toast.success('Cargado')
        } catch (e) {
            toast.dismiss()
            toast.error('Hubo un error al cargar el producto: '+e?.response?.data);
            console.error(e)
        }
    }

    useEffect(() => {
        if (params.id !== 'create-product') {
            handlerGetProduct()
        }
    }, [])


    const handlerProduct = (e) => {
        const name = e.target.name
        setProduct({...product, [name]: e.target.value})
    }

    const handlerAddSizes = () => {
        const data = product.sizes ? product.sizes : []
        setProduct({...product, sizes: [...data, sizes]})
        setSizes({size: "", quantity: 0})
        document.getElementById('sizes').value = '';
        document.getElementById('quantity').value = '';
    }

    const deleteSize = (sizeToDelete) => {
       const newSizes = product.sizes.filter(size => size !==  sizeToDelete)
       setProduct({... product, sizes: newSizes})
    }

    return(
        <div className="h-fit p-4">

            <Toaster position="bottom-right" reverseOrder={true}/>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Producto</h1>
                    <div className="flex items-center">
                    <HashtagIcon className="w-4 h-4 fill-gray-700"/>
                    <span className="font-light text-gray-700 uppercase">{product._id || params.id}</span>
                    </div>
                </div>

                <ProductHandlerButton setProduct={setProduct} 
                product={product} imgs={imgs} setImgs={setImgs} imgsDeleted={imgsDeleted} setImgsDeleted={setImgsDeleted}/>

            </div>

            <div className="flex items-start my-4">
                
                <ProductImgsComponent imgs={imgs} setImgs={setImgs} imgsDeleted={imgsDeleted} setImgsDeleted={setImgsDeleted}
                productImgs={product?.imgs} setProduct={setProduct} product={product}/>

                <div className="grid grid-cols-1 gap-6 w-4/5">
                    <div className="flex flex-col">
                    <label htmlFor="brand" className="text-xs font-semibold">Marca</label>
                    <input name="brand" onChange={handlerProduct} className="bg-transparent border-b-2 border-b-gray-500 appearance-none focus:outline-none focus:border-b-blue-500 font-light" type="text" defaultValue={product?.brand}/>
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="name" className="text-xs font-semibold">Nombre</label>
                    <input name="name" onChange={handlerProduct} className="bg-transparent border-b-2 border-b-gray-500 appearance-none focus:outline-none focus:border-b-blue-500 font-light" type="text" defaultValue={product?.name}/>
                    </div>

                    <div className="my-2">
                        <label htmlFor="sizes" className="text-xs font-semibold">Añade un talle</label>
                        <div>
                            <div className="flex items-center">
                            <input id="sizes" name="sizes" onChange={(e) => setSizes({...sizes, size: e.target.value})} 
                            className="w-20 bg-white/25 appearance-none focus:outline-none p-2 text-sm font-light rounded-md mr-2" placeholder="Talle" type="text"/>
                            
                            <input id="quantity" name="quantity" onChange={(e) => setSizes({...sizes, quantity: e.target.value})} 
                            className="w-20 bg-white/25 appearance-none focus:outline-none p-2 text-sm font-light rounded-md" placeholder="cant" min="1" type="number"/>
                            
                            <button disabled={!(sizes.size.length > 0 && sizes.quantity > 0)} onClick={handlerAddSizes} className="bg-black ml-2 p-1 rounded-md h-full">
                            <PlusIcon className="w-3 h-4 fill-white"/>
                            </button>
                            </div>

                            <div className="flex items-center w-4/5 overflow-x-auto mt-4 py-2">
                            {product && product?.sizes && product?.sizes.length > 0 &&
                                product.sizes.map((size, i) => {
                                    return(
                                        <div key={i} className="flex items-center bg-gray-200 rounded-md mr-2">
                                            <div className="flex items-center divide-x divide-gray-900 space-x-2 mr-2">
                                                <span className="text-sm font-semibold px-2 py-1">{size.size}</span>
                                                <span className="text-sm font-semibold px-2 py-1">{size.quantity}</span>
                                            </div>
                                            <button onClick={() => deleteSize(size)} className="p-1 bg-black rounded-r-md">
                                                <XMarkIcon className="w-5 h-5"/>
                                            </button>
                                        </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>

                    </div>

                    
                    <ProductCategoriesComponent product={product} setProduct={setProduct}/>

                    <div className="flex flex-col">
                    <label htmlFor="description" className="text-xs font-semibold">Descripción</label>
                    <textarea name="description" onChange={handlerProduct} className="bg-white/25 break-words p-2 text-sm appearance-none focus:outline-none focus:border-b-blue-500 font-light my-2 rounded-md" type="text" defaultValue={product?.description}></textarea>
                    </div>

                    <div className="flex items-center">
                        <div className="flex flex-col bg-black p-2 rounded-md w-1/3 mr-4">
                            <label htmlFor="price" className="text-xs text-white font-semibold">Precio</label>
                            <input name="price" onChange={handlerProduct} className="w-full bg-black appearance-none focus:outline-none text-sm font-light text-white" type="number" defaultValue={product?.price}/>
                        </div>

                        <div className="flex flex-col bg-white/50 p-2 rounded-md w-1/3">
                            <label htmlFor="discount" className="text-xs font-semibold">Precio de descuento</label>
                            <input name="discount" onChange={handlerProduct} className="w-full bg-transparent appearance-none focus:outline-none text-sm font-light" type="number" defaultValue={product?.discount}/>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )
}