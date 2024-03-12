"use client"
import Link from "next/link"
import {Squares2X2Icon, TruckIcon, UserIcon, ArrowRightStartOnRectangleIcon, ShoppingCartIcon} from "@heroicons/react/24/solid"
import { usePathname } from "next/navigation"

export const NavbarComponent = () => {
    const route = usePathname()
    return(
        <div className="fixed md:relative bottom-0 w-full md:w-80 z-30 bg-black">

            <h1 className="primaryColor text-3xl text-center p-2 my-4 font-bold">KOWY</h1>

            <div className="flex justify-center h-1/4">
                <div className="flex items-center primary rounded-lg p-2 h-12">
                    <UserIcon className="w-5 h-5 mr-1"/>
                    <h4>Matias Muñoz</h4>
                </div>
            </div>

            <div className="grid grid-cols-1 place-content-start space-y-5 h-2/4 w-full">
                <Link href="/" className="flex items-center">
                    <div className={`w-1 h-5 rounded-r-lg ${route === "/" ? "primary" : "bg-transparent"}`} ></div>
                    <div className="flex justify-center  w-full">
                        <div className="flex items-center mx-auto w-3/5">
                            <Squares2X2Icon className="w-7 h-7 fill-white mr-1"/>
                            <span className="text-start text-white font-semibold text-xl w-full">Home</span>
                        </div>
                    </div>
                </Link>

                <Link href="/orders" className="flex items-center">
                    <div className={`w-1 h-5 rounded-r-lg ${route === "/orders" ? "primary" : "bg-transparent"}`} ></div>
                    <div className="flex justify-center w-full">
                        <div className="flex items-center mx-auto w-3/5">
                            <TruckIcon className="w-7 h-7 fill-white mr-1"/>
                            <span className="text-start text-white font-semibold text-xl w-full">Ordenes</span>
                        </div>
                    </div>
                </Link>
                
                <Link href="/products" className="flex items-center w-full">
                    <div className={`w-1 h-5 rounded-r-lg ${route === "/products" ? "primary" : "bg-transparent"}`} ></div>
                    <div className="flex justify-center w-full">
                        <div className="flex items-center mx-auto w-3/5">
                            <ShoppingCartIcon className="w-7 h-7 fill-white mr-1"/>
                            <span className="text-start text-white font-semibold text-xl w-full">Productos</span>
                        </div>
                    </div>
                </Link>

                <Link href="/usuarios" className="flex items-center">
                    <div className={`w-1 h-5 rounded-r-lg ${route === "/usuarios" ? "primary" : "bg-transparent"}`} ></div>
                    <div className="flex justify-center w-full">
                        <div className="flex items-center mx-auto w-3/5">
                            <UserIcon className="w-7 h-7 fill-white mr-1"/>
                            <span className="text-start text-white font-semibold text-xl w-full">Usuarios</span>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="flex justify-center">
                <div className="flex items-center mx-auto w-1/2">
                    <ArrowRightStartOnRectangleIcon className="w-7 h-7 fill-white mr-1"/>
                    <span className="text-white text-sm">Cerrar session</span>
                </div>
            </div>

        </div>
    )
}