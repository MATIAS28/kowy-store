import { CurrencyDollarIcon, EyeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export const ProductCardComponent = ({id, img, brand, name, price}) => {
    return(
        <div className="flex-none bg-white rounded-lg w-80 mr-3 bg-white/50 hover:shadow-md">
            <Link href={"/products/"+id} className="">
            <div>
                <img className="h-64 w-full rounded-t-lg" src={img} alt=""/>
            
                <div className="flex justify-between items-center p-2">
                    <div>
                    <div className="flex justify-center">
                    <EyeIcon className="w-4 h-4 fill-gray-500"/>
                    </div>
                    <span className="text-xs text-center">12</span>
                    </div>
                    
                    <div className="block mx-2">
                    <p className="text-xs font-semibold text-gray-500 text-center">{brand}</p>
                    <span className="text-xs text-center truncate">{name}</span>
                    </div>

                    <div className="">
                    <div className="flex justify-center">
                    <CurrencyDollarIcon className="w-4 h-4 fill-gray-500"/>
                    </div>
                    <span className="text-xs font-light text-center">${price}</span>
                    </div>
                </div>
            </div>
            
            
            
            </Link>
        </div>
    )
}