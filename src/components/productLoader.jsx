


export const ProductLoaderComponent = () => {
    const products = [1, 2, 3, 4, 5, 6]
    
    return(
    <>
    {products.map((product, i) => {
        return(
        <div key={i} className="flex-none bg-white rounded-lg w-80 p-2 bg-white/25">
        <div>
            <div className="h-64 w-fullrounded-t-lg bg-gray-200 animate-pulse mb-2 rounded-sm"></div>
        
            <div className="flex justify-between items-center h-9 bg-gray-200 animate-pulse rounded-sm">
                
            </div>
        </div>
        </div>
        )
    })}
    </>
    )
}