import { Link } from "react-router-dom"
import { DispatchContext } from "../../context/userContext/AuthContext"
import { useContext } from "react"
import {logoutUser} from '../../context/userContext/actions'
import { MapPinIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid"

export const Profile = ({userData, setSectionSelector, sectionSelector}) => {
    const dispatch = useContext(DispatchContext)
    return(
        <div className="relative grid grid-cols-1 w-full md:w-1/3 lg:w-1/4 h-fit md:h-screen m-0 border-b md:border-r p-2">

               <div className="w-full h-fit md:h-full">

                <div className="flex justify-center items-end my-4">
                    <div className="p-2 rounded-full">
                        <UserIcon className="w-12 h-12" fill="black"/>
                    </div>
                </div>

                <div className="h-fit flex-col">
                <h1 className="text-center text-black font-semibold text-xl">{userData.user.name+' '+userData.user.surname}</h1>
                <h2 className="text-center text-gray-500 text-lg">{userData.user.email}</h2>
                </div>

                <div className="flex items-center w-full p-2 h-2/4">
                  <div className="flex md:block w-full md:space-y-4 w-2/4">
                    
                    <button onClick={() => setSectionSelector(true)} 
                    className={`flex  justify-center items-center rounded mr-2 md:mr-0
                    w-full p-2 h-12 hover:shadow ${sectionSelector ? 'primary' : 'border'}`}>
                        <ShoppingBagIcon className="w-12 h-6 mr-2"/>
                        <span className="flex-none text-xs font-semibold md:w-16 text-start">Compras</span>
                    </button>

                    <button onClick={() => setSectionSelector(false)} 
                    className={`flex  justify-center items-center rounded
                    w-full p-2 h-12 hover:shadow ${!sectionSelector ? 'primary' : 'border'}`}>
                        <MapPinIcon className="w-12 h-6 mr-2"/>
                        <span className="flex-none text-xs font-semibold md:w-16 text-start">Direcciones</span>
                    </button>

                  </div>
                </div>
            </div>

            <button onClick={() => logoutUser(dispatch)} 
                className="relative md:absolute bottom-0 text-center w-full text-red-500 text-sm font-bold my-2 p-2">
                    Cerrar sesión
            </button>

        </div>
    )
}