import { EyeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

const Product = ({product}) => {
    const {imgs, brand, name, price, _id, sizes, createdAt} = product
    const isNew = new Date() - new Date(createdAt) < 604800016.56

    return(
       <article className="rounded bg-white p-0 w-full border">
        <div className="rounded-t-lg p-2">
            <div className="relative rounded-t-lg p-0">
                {isNew &&
                    <span className="absolute top-0 right-0 primary text-xs font-semibold px-2 py-1 rounded m-2">
                        Nuevo
                    </span>
                }
                <img className="h-60 w-full rounded-lg" src={imgs[0].url}/>
            </div>

            <div className="flex flex-col p-1">
                <p className="text-xs secondaryColor font-bold italic py-1">{brand}</p>
                <p className="text-sm mt-1 h-16">{name}</p>
                <p className="text-sm text-gray-500">$ {price}</p>
            </div>
        </div>

        <div className="w-full flex justify-around items-center bg-gray-200 p-1">
            {sizes && sizes.length &&
            sizes.map((size, i) => <span key={i} className="text-xs uppercase font-light">{size.size}</span> )}
        </div>

        <Link to={'/product/'+_id} >
            <div className="w-full flex justify-center items-center bg-black rounded-b hover:shadow-lg p-2">
                <EyeIcon className="w-5 h-5 mr-1" fill="white"/>
                <span className="text-white text-base font-semibold">ver</span>
            </div>
        </Link>
        </article>
             
    )
}

export default Product