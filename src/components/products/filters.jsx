import { Link, useParams } from "react-router-dom"

const Filters = () => {
    const categories = ['zapatillas', 'gorros', 'medias', 'buzos', 'Piluso']
    return(
        <div className="flex items-center p-2 bg-gray-100 px-3">
            <h4 className="text-lg border-r-2 px-2 text-gray-600 font-medium">Productos</h4>
            <div className="filters">
                <ul className="flex mx-2">
                    {categories.map((cat, i) => {
                        return (
                            <Link key={i} to={'/products/'+cat}>
                                <li className="text-sm font-semibold mx-3" key={i}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</li>
                            </Link>
                        )
                    })}
                </ul>
            </div>

            <style jsx="true">
            {`
                @media(max-width: 768px){
                    .filters{
                        overflow-x: scroll;
                    }

                    .filters ul{
                        padding: 1rem; 
                    }
                }
            `}
            </style>

        </div>
    )
}

export default Filters