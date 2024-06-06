'use client'
import toast from 'react-hot-toast';
import { registerAdmin } from "@/services/adminService"
import { useState } from "react"



export const RegisterComponent = () => {
    const [admin, setAdmin] = useState({})

    const handlerRegister = async (e) => {
        toast.loading('Registrando...')
        e.preventDefault()
        try {
            const adminSaved = await registerAdmin(admin)
            toast.dismiss()
            setAdmin({})
            toast.success('Admin registrado correctamente')
            e.target.reset()
        } catch (e) {
            toast.dismiss()
            toast.error('Error al registrar admin')
            console.error(e.response.data)
        }
    }

    return(
        <div className="w-full">
        
        <h1 className="text-black md:text-white text-center font-semibold text-2xl my-4">Registrar Admin</h1>

        <form onSubmit={handlerRegister}>

            <div className="mb-6 rounded">
            <label className="block text-black md:text-white text-xs font-semibold mb-2" htmlFor="email">
                Nombre
            </label>
            <input className="bg-black text-sm font-light appearance-none rounded border p-2 w-full text-black md:text-white outline-none focus:shadow-outline" 
            id="name" type="text" placeholder="ingresa tu correo electrónico" 
            onChange={(e) => setAdmin({...admin, name: e.target.value})}/>
            </div>

            <div className="mb-6 rounded">
            <label className="block text-black md:text-white text-xs font-semibold mb-2" htmlFor="email">
                Email
            </label>
            <input className="bg-black text-sm font-light appearance-none rounded border p-2 w-full text-black md:text-white outline-none focus:shadow-outline" 
            id="email" type="text" placeholder="ingresa tu correo electrónico" 
            onChange={(e) => setAdmin({...admin, email: e.target.value})}/>
            </div>

            <div className="mb-6 rounded">
            <label className="block text-black md:text-white text-xs font-semibold mb-2" htmlFor="password">
                Contraseña
            </label>
            <input className="bg-black text-sm font-light appearance-none rounded border p-2 w-full text-black md:text-white outline-none focus:shadow-outline" 
            id="password" type="password" placeholder="ingresa tu correo contraseña" minlength="8"
            onChange={(e) => setAdmin({...admin, password: e.target.value})}/>
            </div>

            <div className="flex justify-center">
                <button className="bg-black md:bg-white text-sm text-white md:text-black font-semibold p-2 md:p-3 rounded focus:outline-none focus:shadow-outline disabled:opacity-25 w-4/5 md:w-full" type="submit">
                    Registrar
                </button>
            </div>

        </form>
     </div>
    )
}