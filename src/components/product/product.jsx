import { EyeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

const Product = ({product}) => {
    const {imgs, brand, name, price, _id, sizes, createdAt} = product
    const isNew = new Date() - new Date(createdAt) < 604800016.56

    return(
        <Link to={'/product/'+_id} className="hover:scale-105">
            <article className="bg-white w-full border rounded-lg">
        <div className="">
            <div className="relative rounded-t-lg p-0">
                {isNew &&
                    <span className="absolute top-0 right-0 primary text-xs font-semibold px-2 py-1 rounded m-2">
                        Nuevo
                    </span>
                }
                <img className="h-60 w-full rounded-t-lg" src={imgs[0].url}/>
            </div>

            <div className="flex flex-col p-2">
                <p className="text-xs secondaryColor font-bold italic py-1">{brand}</p>
                <p className="text-sm mt-1 h-16">{name}</p>
                <p className="text-xs my-2">$ {price}</p>
            </div>
        </div>

        <div className="w-full flex justify-around items-center bg-black p-2 rounded-b-lg">
            {sizes && sizes.length &&
            sizes.map((size, i) => <span key={i} className="text-xs text-white uppercase">{size.size}</span> )}
        </div>
        
        </article>
        </Link>
    )
}

export default Product