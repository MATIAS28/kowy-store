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
        <div className="flex justify-center items-center h-screen">
            <div className="bg-black p-4">
                <h1 className="text-3xl text-center font-bold text-white">·ERROR·</h1>
                <h2 className="text-9xl text-center border-b primaryColor">404</h2>
                <div className="text-center">
                <h3 className="text-2xl font-light text-white">Página no encontrada</h3>
                <h4 className="text-lg font-light text-white animate-pulse">Seras redirigido a la pagina principal</h4>       
                </div>      
            </div>      
        </div>
    )
}

export default Error