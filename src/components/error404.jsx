import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Error = () => {
    const navigate = useNavigate();

    useEffect(() => {
       setTimeout(() => {
            navigate('/')
        }, 3000);
    }, [])

    return(
        <div className="mt-20 h-full">
            <div className="flex justify-center">
            <ExclamationCircleIcon className="w-12 h-12" fill="red"/>
            </div>
            <div className="text-center">
            <h3 className="text-xl font-bold font-mono">Pagina no encontrada</h3>
            <h4 className="text-lg text-gray-500 font-semibold">Seras redirigido a la pagina principal</h4>       
            </div>        
        </div>
    )
}

export default Error