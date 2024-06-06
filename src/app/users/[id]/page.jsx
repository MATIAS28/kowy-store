'use client'
import { UserActionsButton } from "@/components/buttons/userActions";
import { ErrorComponent } from "@/components/error";
import { LoaderComponent } from "@/components/loader";
import { UserAddresses } from "@/components/user/userAddresses";
import { UserOrders } from "@/components/user/userOrders";
import { getUser } from "@/services/usersServices";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function UserPage({params}){
    const [user, setUser] = useState(null)
    const [filter, setFilter] = useState(false)
    const [error, setError] = useState(null)

    const handlerGetUser = async () => {
        try {
            const User = await getUser(params.id)
            setUser(User)
        } catch (e) {
            setError(e)
            console.error(e);
        }
    }

    useEffect(() => {
        handlerGetUser()
    }, [])


    if (!error && !user) {
        return <LoaderComponent/>
    }

    if (error) {
        return <ErrorComponent name={'usuario'}/>
    }

    return(
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <UserIcon className="w-16 h-16 mr-4 fill-black"/>
                    <div>
                        <h2 className="text-sm text-light">{user.email}</h2>
                        <h4 className="text-sm text-light">{user.name+' '+user.surname}</h4>
                        <h3 className="text-sm text-gray-500 font-light">#{user._id.toUpperCase()}</h3>
                    </div>
                </div>
                <UserActionsButton id={params.id}/>
            </div>

            <div className="flex items-center my-6">
                <button className={`text-xs font-semibold py-[0.15rem] mr-4
                ${!filter ? 'border-b-2 border-black': ''}`}
                onClick={() => setFilter(false)}>
                    Direcciones
                </button>

                <button className={`text-xs font-semibold py-[0.15rem] mr-4
                ${filter ? 'border-b-2 border-black': ''}`}
                onClick={() => setFilter(true)}>
                    Ordenes
                </button>
            </div>

            <div className="w-full">
                {!filter ? 
                <UserAddresses addresses={user.addresses}/>
                :
                <UserOrders id={params.id}/>
                }
            </div>

        </div>
    )
}