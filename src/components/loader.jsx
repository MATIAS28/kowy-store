

export const LoaderComponent = () => {
    return(
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="flex justify-center items-center w-32 h-4 overflow-hidden p-1">
                    <div className="loader w-12 h-1 left-0 bg-gray-400 rounded-full"></div>
                </div>
            </div>


            <style>
             {`
                .loader {
                  animation: right-left 0.5s infinite alternate;
                }
                
                @keyframes right-left {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
                }
             `}
            </style>
        </>
    )
}