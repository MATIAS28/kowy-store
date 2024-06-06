'use client'
import { ErrorComponent } from "@/components/error"
import { TableLoaderComponent } from "@/components/tableLoader"
import { getAllUsers, searchUser } from "@/services/usersServices"
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UsersPage(){
    const [users, setUsers] = useState([])
    const [error, setError] = useState()
    const [filter, setFilter] = useState(false)
    const [search, setSearch] = useState(null)
    const router = useRouter() 

    const getUsers = async () => {
        try{
            const Users = await getAllUsers(filter)
            console.log(Users);
            setUsers(Users)
            if(Users.length == 0) setError(true)
        }catch(e){
            console.error(e);
            setError(e)
        }
    }

    const handlerSearchUser = async () => {
        setUsers([])
        setError()
        setFilter(null)
        try {
            const User = await searchUser(search)
            console.log(User);
            setUsers(User)
        } catch (e) {
            setError(true)
            console.error(e);
        }
    }

    useEffect(() => {
        if (filter != null) {
            setUsers([])
            setError()
            getUsers()
        }
    }, [filter])

    return(
        <div className="grid grid-cols-1 p-4">
            <div className="flex items-center justify-between my-4">
                <div>
                    <h1 className="text-3xl font-semibold">Usuarios</h1>
                    <span className="font-light text-gray-500">{users.length} usuarios encontradas</span>
                </div>
                <div className='flex items-center space-x-2 bg-white p-2 w-1/3 rounded-lg'>
                    <MagnifyingGlassIcon className='w-6 h-6' fill='gray'/>
                    
                    <input onChange={(e) => setSearch(e.target.value)} className='focus:outline-none w-full text-sm' 
                    placeholder='Buscar por ID' type="text"/>

                    <button onClick={handlerSearchUser} className="text-xs">
                        Buscar
                    </button>
                </div>
            </div>

            <div className="flex items-center my-4">
                <button className={`text-xs font-semibold py-[0.15rem] mr-4
                ${filter === false ? 'border-b-2 border-black': ''}`}
                onClick={() => setFilter(false)}>
                    Todas los usuarios
                </button>

                <button className={`text-xs font-semibold py-[0.15rem] mr-4
                ${filter === true ? 'border-b-2 border-black': ''}`}
                onClick={() => setFilter(true)}>
                    Clientes
                </button>
            </div>

            <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs font-semibold uppercase primary">
                    <tr>
                        <th scope="col" class="px-4 py-3">Usuario</th>
                        <th scope="col" class="px-4 py-3">Dirección</th>
                        <th scope="col" class="px-4 py-3">ordenes</th>
                        <th scope="col" class="px-4 py-3">gastado</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 &&
                    users.map((user, i) => {
                        let address = user.addresses.length > 0 ? user.addresses[0].province : 'Sin direcciones'
                        return(
                        <tr key={i} onClick={() => router.push('/users/'+user._id)} className="text-sm hover:bg-white/25 cursor-pointer py-2">
                            <td className="flex items-center px-4 py-3">
                                <UserCircleIcon className="w-7 h-7 mr-2 fill-black"/>
                                <div className="flex flex-col">
                                    <span className="text-sm">{user.name+' '+user.surname}</span>
                                    <span className="text-xs text-gray-600 font-semibold">{user.email}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3">{address}</td>
                            <td className="px-4 py-3">{user?.orders}</td>
                            <td className="px-4 py-3">$150.000</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            
            {!users && users.length == 0 && !error && <TableLoaderComponent/>}
            {error &&  <ErrorComponent name={'ususarios'}/>}

        </div>
    )
}