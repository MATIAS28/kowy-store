


export const TableLoaderComponent = () => {
    const elements = [1, 2, 3, 4, 5, 6, 7, 8]
    return(
        <div className="">
            {elements.map((e, i) => {
                return <div key={i} className="w-full p-6 bg-white/20 my-2 animate-pulse rounded-lg"></div>
            })}
        </div>
    )
}