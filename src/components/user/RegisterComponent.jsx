import { useState } from "react"
import { registerUser } from "../../context/userContext/actions" 
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

function RegisterComponent({isOrder}){
    const [user, setUser] = useState({})
    const [error, setError] = useState()
    const [registerSuccess, setRegisterSuccess] = useState()

    const handleInputChange = (e) => {
        let name = e.target.id
        let value = e.target.value
        setUser(prevState => {
            const newState = { ...prevState };
        
            if (value.length > 0) {
                newState[name] = value;
            } else {
                delete newState[name];
            }
        
            return newState;
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userReg = await registerUser(user)
            if (userReg.status === 201) {
                setRegisterSuccess(userReg.data.message)
                e.target.reset()
                setError()
            }
        } catch (e) {
            setError(e.message || e.response.data.message)
            console.log(e)
        }
    }

    const handleBlur = (e) =>{
        if (e.target.value.length === 0) {
            e.target.classList.add('border-b-2')
            e.target.classList.add('border-b-red-500')
        }else{
            e.target.classList.remove('border-b-2')
            e.target.classList.remove('border-b-red-500')
        }
    }
    return(
        <div className="w-full">
        <form onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl font-semibold my-4">Crear cuenta</h1>

        {error != undefined && 
        <p className="w-full rounded secondary p-2 my-3 font-light animate-pulse text-white">{error}</p>
        }

        {registerSuccess != undefined && <p className="w-full rounded bg-gray-600 p-2 my-3 font-light flex items-center text-white"><CheckCircleIcon className="w-5 h-5 mx-2"/> {registerSuccess}, inicia sesion</p>}
        <div className="mb-4">
            <label className="block text-gray-800 text-xs mb-2" htmlFor="name">
                Nombre
            </label>
            <input className="appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline" id="name" type="text" placeholder="Nombre" onChange={handleInputChange} onBlur={handleBlur}/>
            </div>
            
            <div className="mb-4">
            <label className="block text-gray-800 text-xs mb-2" htmlFor="surname">
                Apellido
            </label>
            <input className="appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline" id="surname" type="text" placeholder="Apellido" onChange={handleInputChange} onBlur={handleBlur}/>
            </div>
            
            <div className="mb-4">
            <label className="block text-gray-800 text-xs mb-2" htmlFor="email">
                Email
            </label>
            <input className="text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline" id="email" type="text" placeholder="email" onChange={handleInputChange} onBlur={handleBlur}/>
            </div>
            <div className="mb-6">
            <label className="block text-gray-800 text-xs mb-2" htmlFor="password">
                Contraseña
            </label>
            <input className="text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:outline" id="password" type="password" placeholder="contraseña" onChange={handleInputChange} onBlur={handleBlur}/>
            </div>


            <button className="bg-black text-white text-xs md:text-base duration-500 py-1 px-4 rounded focus:outline-none focus:outline disabled:opacity-25 w-full mb-4 font-semibold" 
            disabled={Object.keys(user).length < 4} type="submit">
                Registrar
            </button>

            <div className={`flex items-center justify-center space-x-2 font-light text-xs md:text-base
            ${isOrder ? 'hidden' : ''}`}>
            <span>¿Ya tenés una cuenta?</span>
            <Link to='/login' className="inline-block align-baseline text-black border-black hover:border-b-2">
                Iniciar Sesión
            </Link>
            </div>
        </form>
    </div>
    )
}

export default RegisterComponent