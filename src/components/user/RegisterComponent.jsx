import { useState } from "react"
import { registerUser } from "../../context/userContext/actions" 
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

function RegisterComponent({b}){
    const [user, setUser] = useState()
    const [error, setError] = useState()
    const [registerSuccess, setRegisterSuccess] = useState()

    const handleInputChange = (e) => {
        let name = e.target.id
        let value = e.target.value
        setUser({
            ...user,
            [name]: value
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
        <>
        <form className="primary shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl font-semibold my-4">Registro</h1>

        {error != undefined && 
        <p className="w-full rounded secondary p-2 my-3 font-light animate-pulse text-white">{error}</p>
        }

        {registerSuccess != undefined && <p className="w-full rounded bg-gray-600 p-2 my-3 font-light flex items-center text-white"><CheckCircleIcon className="w-5 h-5 mx-2"/> {registerSuccess}, inicia sesion</p>}
        <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="name">
                Nombre
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nombre" onChange={handleInputChange} onBlur={handleBlur}/>
            </div>
            
            <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="surname">
                Apellido
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="surname" type="text" placeholder="Apellido" onChange={handleInputChange} onBlur={handleBlur}/>
            </div>
            
            <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" onChange={handleInputChange} onBlur={handleBlur}/>
            </div>
            <div className="mb-6">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="contraseña" onChange={handleInputChange} onBlur={handleBlur}/>
            </div>

            <div className="flex items-center justify-between">

            <button className="bg-black text-white duration-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25"  type="submit">
                Registrar
            </button>

            <Link to='/login' className="inline-block align-baseline font-bold text-base text-black border-black hover:border-b-2">
                Iniciar Sesión
            </Link>

            </div>
        </form>
    </>
    )
}

export default RegisterComponent