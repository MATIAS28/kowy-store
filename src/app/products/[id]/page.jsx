'use client'
import { saveProduct } from "@/services/productsService"
import { CloudArrowUpIcon, HashtagIcon, PlusIcon } from "@heroicons/react/24/solid"
import { useState } from "react"


export default function ProductPage ({params}){
    const [product, setProduct] = useState({})
    const [imgs, setImgs] = useState([])
    const [sizes, setSizes] = useState({size: "", quantity: 0})

    const handlerProduct = (e) => {
        const name = e.target.name
        setProduct({...product, [name]: e.target.value})
    }

    const handlerAddSizes = () => {
        const data = product.sizes ? product.sizes : []
        setProduct({...product, sizes: [...data, JSON.stringify(sizes)]})
        setSizes(null)
        document.getElementById('sizes').value = '';
        document.getElementById('quantity').value = '';
    }

    const addImg = (e) => {
        setImgs(e.target.files[0])
        console.log(imgs);
    }

    const handlerSaveProduct = async () => {
        try {
            const productSaved = await saveProduct(product, imgs)
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <div className="h-screen p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Productos</h1>
                    <div className="flex items-center">
                    <HashtagIcon className="w-4 h-4 fill-gray-700"/>
                    <span className="text-lg text-gray-700">{params.id}</span>
                    </div>
                </div>

                <button type="submitt" onClick={handlerSaveProduct} className="flex justify-center items-center primary p-2 rounded-md">
                    <CloudArrowUpIcon className="w-5 h-5 mr-2"/>
                    <span className="text-base font-semibold">Publicar</span>
                </button>
            </div>

            <div className="flex items-start my-4">
                <div className="w-full h-screen mr-4">
                    {imgs.length > 0 ? 
                    <img src={imgs} alt="" />
                    :
                    <div className="flex justify-center items-center bg-white/25 h-3/5 rounded-md">
                        <span className="text-sm text-gray-700 font-light">agrega una imagen</span>
                    </div>
                    }

                    <div className="hover:bg-white/25 rounded-md mt-4 w-fit">
                        <label htmlFor="fileInput">
                        <img src="/icons/addImg.png" className="w-16 h-16 cursor-pointer"/>
                        </label>
                        <input onChange={addImg} type="file" id="fileInput" style={{ display: 'none' }}/>
                    </div>
                
                <div>
                        
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 w-4/5">
                    <div className="flex flex-col">
                    <label htmlFor="brand" className="text-xs font-semibold">Marca</label>
                    <input name="brand" onChange={handlerProduct} className="bg-transparent border-b-2 border-b-gray-500 appearance-none focus:outline-none focus:border-b-blue-500 text-xl font-semibold" type="text" defaultValue=""/>
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="name" className="text-xs font-semibold">Nombre</label>
                    <input name="name" onChange={handlerProduct} className="bg-transparent border-b-2 border-b-gray-500 appearance-none focus:outline-none focus:border-b-blue-500 text-xl font-semibold" type="text" defaultValue=""/>
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="sizes" className="text-xs font-semibold">Añade un talle</label>
                        <div className="flex items-end my-2">
                            <input id="sizes" name="sizes" onChange={(e) => setSizes({...sizes, size: e.target.value})} 
                            className="w-20 bg-white/25 appearance-none focus:outline-none p-1 rounded-md mr-2" placeholder="Talle" type="text" defaultValue=""/>
                            
                            <input id="quantity" name="quantity" onChange={(e) => setSizes({...sizes, quantity: e.target.value})} 
                            className="w-20 bg-white/25 appearance-none focus:outline-none p-1 rounded-md" placeholder="cant" min="1" type="number" defaultValue=""/>
                            
                            <button disabled={!sizes?.size.length > 0 && !sizes?.quantity} onClick={handlerAddSizes} className="bg-black ml-2 p-1 rounded-md h-full">
                            <PlusIcon className="w-3 h-4 fill-white"/>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center w-4/5 overflow-x-auto py-3">
                    {product && product?.sizes && product?.sizes.length > 0 &&
                        product.sizes.map((size, i) => {
                            return(
                                <div key={i} className="bg-black rounded-md mr-2 divide-x p-1">
                                    <span className="text-sm font-semibold text-white p-2">{size.size}</span>
                                    <span className="text-xs font-semibold text-red-500 p-2">{size.quantity}</span>
                                </div>
                            )
                        })
                    }
                    </div>

                    <div className="flex items-end">
                        <div className="flex flex-col">
                        <label htmlFor="category" className="text-xs font-semibold">Categoría</label>
                        <input name="category" onChange={handlerProduct} className="w-3/5 bg-transparent border-b-2 border-b-gray-500 appearance-none focus:outline-none focus:border-b-blue-500 text-xl font-semibold mr-2" type="text" defaultValue=""/>   
                        </div>

                        <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-semibold">Precio</label>
                        <input name="price" onChange={handlerProduct} className="w-full bg-transparent border-b-2 border-b-gray-500 appearance-none focus:outline-none focus:border-b-blue-500 text-sm font-light" type="number" defaultValue=""/>
                        </div>
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="description" className="text-xs font-semibold">Descripción</label>
                    <input name="description" onChange={handlerProduct} className="bg-white/25 p-2 text-sm appearance-none focus:outline-none focus:border-b-blue-500 font-light my-2 rounded-md" type="text" defaultValue=""/>
                    </div>

                </div>
            </div>
            
        </div>
    )
}