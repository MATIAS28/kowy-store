
export const ArticlesLoader = () => {
    const repeat = [1,2,3,4]
    return(
        <>
            {repeat.map((number, i) => {
                return(
                <div key={i} className="animate-pulse bg-gray-200 p-3 w-full rounded-lg ">
                <div className="bg-gray-300 rounded-xl h-64 w-full"></div>
                
                <div className=" my-1">
                    <p className="bg-gray-300 w-full px-2 h-7 my-2 rounded-xl"></p>
                    <p className="bg-gray-300 w-full px-2 h-7 rounded-xl"></p>
                </div>
                </div>
                )
            })}
        </>
    )
}