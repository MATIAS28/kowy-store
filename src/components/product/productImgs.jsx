'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState } from "react"


export const ProductImgsComponent = ({imgs, setImgs, imgsDeleted, setImgsDeleted, productImgs, setProduct, product}) => {
    const [imgPreview, setImgPreview] = useState(null)
    

    if (productImgs && productImgs.length > 0 && !imgPreview) {
        setImgPreview(productImgs[0].url)
    }

    const addImg = (e) => {
        setImgs([...imgs, e.target.files[0]])
        if (!imgPreview) {
            setImgPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const deleteProductImg = (imgToDelete) => {
        const newImgs = product.imgs.filter((img) => img !== imgToDelete)
        setImgsDeleted([...imgsDeleted, imgToDelete])
        setProduct({...product, imgs: newImgs})
    }

    const deleteImg = (imgToDelete) => {
        const newImgs = imgs.filter((img) => img !== imgToDelete)
        setImgs(newImgs)
    }

    return(
        <div className="w-full h-screen mr-4">
        {imgPreview ? 
        <img src={imgPreview} className="w-full h-3/5 rounded-md" alt="" />
        :
        <div className="flex justify-center items-center bg-white/25 h-3/5 rounded-md">
            <span className="text-sm text-gray-700 font-light">agrega una imagen</span>
        </div>
        }

        <div className="flex items-center mt-6">
            <div className="hover:bg-white/25 rounded-md w-fit mr-2">
                <label htmlFor="fileInput">
                <img src="/icons/addImg.png" className="w-16 h-16 cursor-pointer"/>
                </label>
                <input onChange={addImg} type="file" id="fileInput" style={{ display: 'none' }}/>
            </div>

            <div className="flex items-center w-4/5 overflow-x-auto">

                {productImgs && productImgs.map((img, i) => {
                    return(
                        <div key={i} className="relative flex items-center mr-2 w-16 h-16">
                            <img onClick={() => setImgPreview(img.url)} className="cursor-pointer w-full h-full rounded-md" src={img.url} alt="" />
                            <button onClick={() => deleteProductImg(img)} className="absolute top-0 right-0 h-5 h-5 rounded-md bg-black hover:bg-red-800 m-1 p-1">
                                <XMarkIcon className="w-full h-full fill-white"/>
                            </button>
                        </div>
                    )
                })}
            
                {imgs.length > 0 && imgs.map((img, i) => {
                    const imgConverted = URL.createObjectURL(img)
                    return(
                        <div key={i} className="relative flex items-center mr-2 w-16 h-16">
                            <img onClick={() => setImgPreview(imgConverted)} className="cursor-pointer w-full h-full rounded-md" src={imgConverted} alt="" />
                            <button onClick={() => deleteImg(img)} className="absolute top-0 right-0 h-5 h-5 rounded-md bg-black hover:bg-red-800 m-1 p-1">
                                <XMarkIcon className="w-full h-full fill-white"/>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    )
}