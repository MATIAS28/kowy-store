import { Link } from "react-router-dom"
import { DispatchContext } from "../../context/userContext/AuthContext"
import { useContext } from "react"
import {logoutUser} from '../../context/userContext/actions'
import { MapPinIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid"

export const Profile = ({userData, setSectionSelector, sectionSelector}) => {
    const dispatch = useContext(DispatchContext)
    return(
        <div className="relative grid grid-cols-1 secondary shadow-sm w-full md:w-1/3 lg:w-1/4 h-fit md:h-screen m-0">

               <div className="w-full h-fit md:h-full">

                <div className="flex justify-center items-center h-32">
                    <div className="primary p-5 rounded-3xl">
                        <UserIcon className="w-12 h-12" fill="black"/>
                    </div>
                </div>

                <div className="h-fit flex-col my-2">
                <h1 className="text-center text-white font-semibold text-2xl">{userData.user.name+' '+userData.user.surname}</h1>
                <h2 className="text-center text-white text-xl">{userData.user.email}</h2>
                </div>

                <div className="flex items-center w-full p-2 h-2/4">
                  <div className="flex md:block w-full md:space-y-6">
                    <button onClick={() => setSectionSelector(true)} 
                    className={`flex justify-center items-center rounded-lg 
                    space-x-1 w-full hover:bg-gray-100/25 p-2 ${sectionSelector ? 'bg-gray-100/25' : ''}`}>
                        <ShoppingBagIcon className="w-6 h-6" fill="white"/>
                        <span className="text-white text-xl">Compras</span>
                    </button>

                    <button onClick={() => setSectionSelector(false)} 
                    className={`flex justify-center items-center rounded-lg 
                    space-x-1 w-full hover:bg-gray-100/25 p-2 ${!sectionSelector ? 'bg-gray-100/25' : ''}`}>
                        <MapPinIcon className="w-6 h-6" fill="white"/>
                        <span className="text-white text-xl">Direcciones</span>
                    </button>
                  </div>
                </div>
            </div>

            <button onClick={() => logoutUser(dispatch)} 
                className="relative md:absolute bottom-0 text-center w-full text-red-500 text-xl font-semibold my-2 p-2">
                    Cerrar sesión
            </button>

        </div>
    )
}