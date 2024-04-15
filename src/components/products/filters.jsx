import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getFilters } from "../../services/products"
import { XMarkIcon, XCircleIcon } from '@heroicons/react/24/solid' 

const Filters = ({filters, setFilters, setShowFiltersMobile}) => {
    const [filtersToShow, setFiltersToShow] = useState({})

    const getAllFilters = async () => {
        try {
            const Filters = await getFilters()
            setFiltersToShow(Filters)
        } catch (e) {
            console.log(e);
        }
    }

    const handlerAddFilter = (filter, value) => {
        if (!(filters[filter].find((Filter) => Filter === value)) ) {
            const newFilters = [...filters[filter], value]
            return setFilters({...filters, [filter]: newFilters})
        }else{
            const deleteFilter = filters[filter].filter((item) => item !== value)
            return setFilters({...filters, [filter]: deleteFilter})
        }
    }

    useEffect(() => {
        getAllFilters()
    }, [])

    return(
        <div className="p-5 md:p-0">

                <div className="block md:hidden relative p-4">
                    <h4 className="text-center text-xl font-semibold">
                        Filtrar por
                    </h4>

                    <button onClick={() => setShowFiltersMobile(false)}
                    className="absolute right-0 top-0 py-4 mr-0">
                        <XMarkIcon className="w-9 h-9 fill-black"/>
                    </button>
                </div>

                <div className="w-full">
                    <h4 className="text-2xl secondaryColor font-bold ml-3">Categorías</h4>

                    <div className="grid grid-cols-1">
                    {filtersToShow && filtersToShow.categories && 
                     filtersToShow.categories.map((category, i) => {
                        const isSelected = filters?.category.find((filter) => filter === category)
                        return(
                              <button key={i}  onClick={() => handlerAddFilter('category', category)}
                              className={`flex items-center secondaryColor w-fit my-1 rounded-3xl px-3 py-1
                              ${isSelected ? 
                              'text-sm primaryColor font-semibold bg-gray-300'
                              : ''}`}>
                                  <p className="text-xl md:text-sm mr-2 text-start font-light uppercase">
                                      {category}
                                  </p>
                                  <XCircleIcon className={`w-4 h-4 fill-gray-500 ${isSelected ? 'block' : 'hidden'}`}/>
                              </button>
                          )
                            })
                        }
                    </div>
                </div>

                <div className="my-6">

                    <h4 className="text-2xl secondaryColor font-bold ml-3">Marca</h4>

                    <div className="grid grid-cols-1 w-full">
                     {filtersToShow && filtersToShow.brands && 
                         filtersToShow.brands.map((brand, i) => {
                          const isSelected = filters?.brand.find((filter) => filter === brand)
                          return(
                                <button key={i}  onClick={() => handlerAddFilter('brand', brand)}
                                className={` flex items-center secondaryColor w-fit my-1 rounded-3xl px-3 py-1
                                ${isSelected ? 
                                'text-sm primaryColor font-semibold bg-gray-300'
                                : ''}`}>
                                    <p className="text-xl md:text-sm mr-2 text-start font-light uppercase">
                                        {brand}
                                    </p>
                                    <XCircleIcon className={`w-4 h-4 ${isSelected ? 'fill-gray-500' : 'fill-transparent'}`}/>
                                </button>
                            )
                         })
                     }
                    </div>
                </div>

                {filtersToShow && filtersToShow?.sizes && filtersToShow?.sizes.length > 0 &&
                    <div className="my-6">

                    <h4 className="text-2xl secondaryColor font-bold ml-3">Talles</h4>

                    <div className="grid grid-cols-1 w-full">
                     {filtersToShow && filtersToShow?.sizes && 
                         filtersToShow.sizes.map((sizes, i) => {
                          const isSelected = filters?.sizes.find((filter) => filter === sizes)
                          return(
                                <button key={i}  onClick={() => handlerAddFilter('brand', sizes)}
                                className={`text-base flex items-center secondaryColor w-fit my-1 rounded-3xl px-3 py-1
                                ${isSelected ? 
                                'text-sm primaryColor font-semibold bg-gray-300'
                                : ''}`}>
                                    <p className="text-xl md:text-sm mr-2 text-start font-light uppercase">
                                        {sizes}
                                    </p>
                                    <XCircleIcon className={`w-4 h-4 ${isSelected ? 'fill-gray-500' : 'fill-transparent'}`}/>
                                </button>
                            )
                         })
                     }
                    </div>
                </div>
                }
        </div>
    )
}

export default Filters