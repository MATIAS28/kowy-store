import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {AuthContext, DispatchContext} from "../../context/userContext/AuthContext"
import {loginUser} from "../../context/userContext/actions"
import { toast, Toaster } from "react-hot-toast"

function LoginComponent({b}){
    const {user} = useContext(AuthContext)
    const dispatch = useContext(DispatchContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [isValid, setIsValid] = useState(true)
    let t = true
    useEffect(() => {
        if (user && t) {
            t = false
            toast('Ya has iniciado sesion')
        }

        if (email?.length > 0 && password?.length >= 8) {
            setIsValid(false)
        }else{
            setIsValid(true)
        }
    },[email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await loginUser(dispatch, {email: email, password: password})
            e.target.reset()
            toast.success('Sesión Iniciada')
        } catch (e) {
            setError(e.message || e.response.data.message)
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
        <Toaster toastOptions={{
    className: '',
    duration: 5000,
    style: {
      background: 'black',
      color: 'white',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }} position="bottom-right" reverseOrder={false}/>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl font-semibold my-4">Iniciar Sesión</h1>
        {error != undefined && <p className="w-full rounded bg-red-600 p-2 my-3 font-light opacity-90 text-white">{error}</p>}
            <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input disabled={!user ? false : true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur}/>
            </div>
            <div className="mb-6">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
            </label>
            <input disabled={!user ? false : true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="contraseña" onChange={(e) => setPassword(e.target.value)} onBlur={handleBlur} autoComplete="current-password"/>
            </div>
            <div className="flex items-center justify-between">
            <button className="bg-blue-500 text-white duration-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25" disabled={isValid && !user || user} type="submit">
                Iniciar Sesión
            </button>
            <Link style={{display: b ? 'block' : 'none'}} to='/register' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Crear cuenta
            </Link>
            </div>
        </form>
    </>
    )
}

export default LoginComponent