import { Link } from "react-router-dom"
import { DispatchContext } from "../../context/userContext/AuthContext"
import { useContext } from "react"
import {logoutUser} from '../../context/userContext/actions'
import { ArrowRightStartOnRectangleIcon, MapPinIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid"

export const Profile = ({userData, setSectionSelector, sectionSelector}) => {
    const dispatch = useContext(DispatchContext)
    return(
        <div className="flex justify-center py-7 bg-neutral-950">

               <div className="w-4/5">

                <div className="flex justify-between w-full items-center my-4">

                    <div className="flex items-center rounded-full mb-4">
                        <UserIcon className="w-10 h-10 mr-2 fill-white"/>
                        <div className="h-fit flex-col">
                        <h1 className="text-center text-white font-semibold">{userData.user.name+' '+userData.user.surname}</h1>
                        <h2 className="text-center text-white/50 text-sm font-light">{userData.user.email}</h2>
                        </div>
                    </div>

                    <button onClick={() => logoutUser(dispatch)} 
                    className="flex items-center text-red-500 text-sm">
                        <ArrowRightStartOnRectangleIcon className="w-5 mr-1"/>
                        <span className="hidden md:block">Cerrar sesión</span>
                    </button>
                </div>


                <div className="flex justify-between md:justify-start items-center space-x-5">
                
                <button onClick={() => setSectionSelector(true)} 
                className={`flex  justify-center items-center pb-2 duration-100 
                 ${!sectionSelector ? '' : 'border-b-4'}`}>
                    <ShoppingBagIcon className="w-6 h-6 mr-1 fill-white"/>
                    <span className="flex-none text-sm text-white font-semibold">Compras</span>
                </button>

                <button onClick={() => setSectionSelector(false)} 
                className={`flex  justify-center items-center pb-2 duration-100 
                ${sectionSelector ? '' : 'border-b-4'}`}>
                    <MapPinIcon className="w-6 h-6 mr-1 fill-white"/>
                    <span className="flex-none text-sm text-white font-semibold">Direcciones</span>
                </button>

                </div>

                
            </div>

        </div>
    )
}