import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"


export const NotFoundComponent = ({name}) => {
    return(
        <div className="flex justify-center items-center w-full my-12">
            <div >
            <div className="flex justify-center items-center">
            <ExclamationTriangleIcon className="w-16 h-16 fill-gray-400"/>
            </div>
            <h3 className="text-center text-bold text-2xl text-gray-400">No se encontraron {name}</h3>
            </div>
        </div>
    )
}