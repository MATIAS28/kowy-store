import { ProductCardComponent } from "../product/productCard"



export const MostClickedComponent = () => {
    return(
        <div className="mt-4">
            <div className="py-1">
                <h4 className="text-xl font-light">Productos mas clickeados</h4>
            </div>

            
             <div className="flex items-center overflow-x-auto w-full h-fit py-4">
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
                <ProductCardComponent/>
             </div>
        </div>
    )
}