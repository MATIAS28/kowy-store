import { useParams } from "react-router-dom"
import Filters from "../components/products/filters"
import ProductsComponent from "../components/products/products"

function Products (){
    const {cat} = useParams()
    return(
        <>
        <div className="w-full p-4 mt-5">
            <h1 className="text-5xl text-semibold">{cat.toUpperCase()+'S'}</h1>
        </div>
        <div id="container">
            
            <div id="filter" className="w-full">
                <Filters/>
            </div>

            <div className="basis-3/4">
                <ProductsComponent/>
            </div>
        </div>

        <style jsx="true">
        {`
            @media(max-width: 768px){
                #container{
                    flex-direction: column;
                }
            }
        `}
        </style>

        </>
    )
}

export default Products