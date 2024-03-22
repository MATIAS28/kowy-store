


export const ProductCategoriesComponent = ({setProduct, product}) => {
    const categories = ['remera', 'buzo', 'pantalon', 'zapatillas', 'medias', 'bermudas', 'shorts', 'piluso']

    const addCategory = (e) => {
        const category = e.target.value.length > 2 ? e.target.value : null
        setProduct({...product, category: category})
    }

    return(
        <div className="flex flex-col w-3/5">
            <label htmlFor="category" className="text-xs font-semibold">Categorías</label>
            <select className="bg-white/25 p-2 rounded-md mt-2 cursosr-pointer" onChange={addCategory} value={product?.category || ""}>
                <option value="" className="text-gray-300 font-light border-b">Agrega una categoría</option>
                {categories.map((category, i) => {
                    return(
                        <option key={i} value={category}>
                            {category.toUpperCase()}
                        </option>
                    )
                })}
            </select>  
        </div>
        
    )
}