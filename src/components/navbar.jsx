"use client"
import Link from "next/link"
import {Squares2X2Icon, TruckIcon, UserIcon, ArrowRightStartOnRectangleIcon, ShoppingCartIcon} from "@heroicons/react/24/solid"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const NavbarComponent = () => {
    const [admin, setAdmin] = useState(null)
    const route = usePathname()
    const router = useRouter()
    
    useEffect(() => {
        let Admin = JSON.parse(localStorage.getItem('admin'))

        if (Admin && !admin) {
            setAdmin(Admin)
        }

        if (!Admin) {
            router.push('/admin')
        }

    }, [admin, route])

    const handlerLogOut = () => {
        setAdmin(null)
        localStorage.clear()
        router.push('/admin')
    }

    return(
    <div className="bg-black fixed md:relative bottom-0 w-72 w- z-30">

        
            <div className="flex justify-center items-center w-full h-1/4 duration-150">
                <div className={`flex items-center h-fit p-2 bg-white duration-150
                ${admin ? 'w-4/5 rounded' : 'w-fit rounded-full'}`}>
                <UserIcon className="w-9 h-9 fill-black"/>
                { admin &&
                    <div className="w-3/4 break-words ml-2">
                    <h4 className="text-sm text-black uppercase font-semibold">{admin.name}</h4>
                    <h5 className="text-xs text-gray-500 font-light h-full">#{admin.id}</h5>
                    </div>
                }
                </div>
            </div>
        
        <div className="flex flex-col h-screen w-full">

        <div className="flex flex-col space-y-5 h-fit my-2">
            <Link href="/" className="flex items-center justify-center w-full hover:bg-white/25 h-10">
                <div className="flex items-center w-4/5">
                    <Squares2X2Icon className={`w-6 h-6 mr-4  ${route == '/' ? 'primaryColor' : 'fill-gray-400'}`}/>
                    <span className={`text-start text-gray-100 font-semibold text-sm w-full ${route == '/' ? 'primaryColor' : ''}`}>Home</span>
                </div>
            </Link>
 
            <Link href="/orders" className="flex items-center justify-center w-full hover:bg-white/25 h-10">
                <div className="flex items-center w-4/5">
                    <TruckIcon className={`w-6 h-6 mr-4 ${route == '/orders' ? 'primaryColor' : 'fill-gray-400'}`}/>
                    <span className={`text-start text-gray-100 font-semibold text-sm w-full ${route == '/orders' ? 'primaryColor' : ''}`}>Ordenes</span>
                </div>
            </Link>
            
            <Link href="/products" className="flex items-center justify-center w-full hover:bg-white/25 h-10">
                <div className="flex items-center w-4/5">
                    <ShoppingCartIcon className={`w-6 h-6 mr-4 ${route == '/products' ? 'primaryColor' : 'fill-gray-400'}`}/>
                    <span className={`text-start text-gray-100 font-semibold text-sm w-full ${route == '/products' ? 'primaryColor' : ''}`}>Productos</span>
                </div>
            </Link>

            <Link href="/users" className="flex items-center justify-center w-full hover:bg-white/25 h-10">
                <div className="flex items-center w-4/5">
                    <UserIcon className={`w-6 h-6 mr-4 ${route == '/users' ? 'primaryColor' : 'fill-gray-400'}`}/>
                    <span className={`text-start text-gray-100 font-semibold text-sm w-full ${route == '/users' ? 'primaryColor' : ''}`}>Usuarios</span>
                </div>
            </Link>
        </div>

        <div className={`flex items-center justify-center w-full hover:bg-white/25 h-10
        ${admin ? '' : 'hidden'}`}>
        <button onClick={handlerLogOut} className="flex items-center w-4/5">
            <ArrowRightStartOnRectangleIcon className="w-6 h-6 mr-4"/>
            <span className="text-start text-gray-100 font-semibold text-sm w-full">Cerrar sesión</span>
        </button>
        </div>
        </div>

    </div>
    )
}