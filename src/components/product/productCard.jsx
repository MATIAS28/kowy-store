import Link from "next/link"

export const ProductCardComponent = () => {
    return(
        <div className="flex-none bg-white rounded-lg w-80 mr-3">
            
            <div className="p-2">
                <img className="h-64 w-full rounded-lg"
                src="https://sumerlabs.com/sumer-app-90b8f.appspot.com/product_photos%2F298a1aeb5449a3a7dc188f7d489f1feb%2F206adcd0-48b8-11ed-b81e-4dcd4fdf8e88?alt=media&token=1f5ac057-c066-4232-a732-964edfc30add" alt=""/>
            
                <div className="">
                    <span className="text-xs font-semibold text-gray-500">Versace</span>
                    <div className="flex justify-between items-center">
                    <span className="text-sm font-light">remera versace ultrarecaro</span>
                    <span className="text-xs font-light">$16.000</span>
                    </div>
                </div>
            </div>
            
            <Link href="/" className="flex justify-center items-center bg-black p-1 mt-1 rounded-b-lg">
                <span className="text-center text-white font-medium">Editar producto</span>
            </Link>
            

        </div>
    )
}