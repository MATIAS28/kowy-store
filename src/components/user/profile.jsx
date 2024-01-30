import { Link } from "react-router-dom"
import { DispatchContext } from "../../context/userContext/AuthContext"
import { useContext } from "react"
import {logoutUser} from '../../context/userContext/actions'
import { MapPinIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid"

export const Profile = ({userData, setSectionSelector, sectionSelector}) => {
    const dispatch = useContext(DispatchContext)
    return(
        <div className="bg-black rounded-lg shadow-sm w-full md:w-1/4 h-fit md:my-0">

               <div className="w-full h-full">
                <div className="flex justify-center items-center primary h-32 rounded-t-lg">
                    <UserIcon className="w-9 h-9" fill="black"/>
                </div>

                <div className="flex-col my-2">
                <h1 className="text-center text-white font-semibold text-xl">{userData.user.name+' '+userData.user.surname}</h1>
                <h2 className="text-center text-white text-lg">{userData.user.email}</h2>
                </div>

                <div className="flex-col w-full p-4 space-y-4">
                    <button onClick={() => setSectionSelector(true)} 
                    className={`flex justify-center items-center rounded-lg 
                    space-x-1 w-full hover:bg-gray-100/25 p-2 ${sectionSelector ? 'bg-gray-100/25' : ''}`}>
                        <ShoppingBagIcon className="w-6 h-6" fill="white"/>
                        <span className="text-white">Compras</span>
                    </button>

                    <button onClick={() => setSectionSelector(false)} 
                    className={`flex justify-center items-center rounded-lg 
                    space-x-1 w-full hover:bg-gray-100/25 p-2 ${!sectionSelector ? 'bg-gray-100/25' : ''}`}>
                        <MapPinIcon className="w-6 h-6" fill="white"/>
                        <span className="text-white">Direcciones</span>
                    </button>
                </div>
                
                <button onClick={() => logoutUser(dispatch)} 
                    className="text-center w-full bg-red-600 text-white p-2 md:rounded-b-lg">
                    Cerrar sesión
                </button>
               </div>

        </div>
    )
}