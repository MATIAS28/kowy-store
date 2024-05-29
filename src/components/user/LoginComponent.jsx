import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {AuthContext, DispatchContext} from "../../context/userContext/AuthContext"
import {loginUser} from "../../context/userContext/actions"
import { toast, Toaster } from "react-hot-toast"

function LoginComponent({isOrder}){
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
            toast.error('Error al iniciar session')
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
        
        <div>
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
        <form onSubmit={handleSubmit}>
        <h1 className="text-center text-lg md:text-3xl font-semibold my-4">Iniciá sesión</h1>
            <div className="mb-4">
            <label className="block text-gray-800 text-xs md:text-sm mb-1" htmlFor="email">
                Email
            </label>
            <input disabled={!user ? false : true} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline text-xs md:text-sm" id="email" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur}/>
            </div>
            <div className="mb-6">
            <label className="block text-gray-800 text-xs md:text-sm mb-1" htmlFor="password">
                Contraseña
            </label>
            <input disabled={!user ? false : true} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:outline text-xs md:text-sm" id="password" type="password" placeholder="contraseña" onChange={(e) => setPassword(e.target.value)} onBlur={handleBlur} autoComplete="current-password"/>
            </div>
    
            <button className="bg-black text-white text-xs md:text-base duration-500 py-1 px-4 rounded focus:outline-none focus:outline disabled:opacity-25 w-full mb-4 font-semibold" disabled={isValid && !user || user} type="submit">
                Iniciar Sesión
            </button>

            <div className={`flex items-center justify-center space-x-2 font-light text-xs md:text-base
            ${isOrder ? 'hidden' : ''}`}>
            <span>¿No tenés cuenta aún?</span>
            <Link style={{display: !user ? 'block' : 'none'}} to='/register' className="inline-block align-baseline border-black hover:border-b-2" href="#">
                Crear cuenta
            </Link>
            </div>

        </form>
    </div>
    )
}

export default LoginComponent