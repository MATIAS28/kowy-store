import { EyeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

const Product = ({img, brand, name, price, id, sizes}) => {
    return(
       <article className="rounded-lg bg-white p-0 w-full border">
        <div className="rounded-t-lg p-2">
            <div className="rounded-t-lg p-0">
                <img className="h-60 w-full rounded-lg" src={img}/>
            </div>

            <div className="flex flex-col p-2 h-24">
                <p className="text-xs secondaryColor font-bold italic py-1">{brand}</p>
                <p className="text-sm font-light my-1">{name}</p>
                <p className="text-sm font-light">${price}</p>
            </div>
        </div>

        <div className="w-full flex justify-around items-center bg-gray-200 p-1">
            {sizes && sizes.length &&
            sizes.map((size, i) => <span className="text-xs uppercase font-light">{size.size}</span> )}
        </div>

        <Link to={'/product/'+id} >
            <div className="w-full flex justify-center items-center bg-black p-2 rounded-b-lg hover:shadow-lg space-x-2">
                <EyeIcon className="w-6 h-6" fill="white"/>
                <span className="text-white text-lg font-semibold">ver</span>
            </div>
        </Link>
        </article>
             
    )
}

export default Product