import { deleteUser } from "@/services/usersServices"
import { ChevronDownIcon, PauseIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

export const UserActionsButton = ({id}) => {
    const [isOpen, setIsOpen] = useState(false)

    const DeleteUser = async () => {
        toast.dismiss()
        toast.loading('Eliminando...')
        try {
            const userDeleted = await deleteUser(id)
            toast.dismiss()
            toast.success('Usuario eliminado correctamente')
            setIsOpen(false)
        } catch (e) {
            toast.dismiss()
            toast.error('Error al eliminar el usuario')
            console.error(e);
        }
    }

    const handlerDeleteUser = () => {
        toast((t) => (
            <div className="w-fit">
                <p className="font-light">
                ¿Estas seguro de eliminar el usuario?
                </p>

                <button className="text-sm font-semibold rounded-xl mr-2"
                 onClick={DeleteUser}>
                    Si
                </button>

                <button className="text-sm font-semibold rounded-xl" 
                onClick={() => toast.dismiss()}>
                    No
                </button>
            </div>
          ));
    }

    return(
        <div className="relative">
            <Toaster position="bottom-right" reverseOrder={false}/>
            <button className="bg-white/50 p-2 rounded-md flex items-center"
            onClick={() => setIsOpen(prev => !prev)}>
                <span className="text-sm mr-2">Acciones</span>
                <ChevronDownIcon className={`w-4 h-4 fill-black duration-150 ${isOpen ? 'rotate-180' : 'rotate-0'}`}/>
            </button>

            <div className={`absolute z-50  bg-white/25 w-full
            ${isOpen ? '' : 'hidden'}`}>

                <div className="w-full">
                <div className="flex justify-center hover:bg-white/50 w-full">
                    <button onClick={handlerDeleteUser} className="flex items-center w-4/5 h-7 text-start text-sm hover:bg-white/50">
                        <TrashIcon className="w-4 h-4 mr-2 fill-black"/>
                        <span className="text-xs font-semibold">Eliminar</span>
                    </button>
                </div>

                <div className="flex justify-center hover:bg-white/50 w-full">
                <button onClick={() => toast.success('dwiada')} className="flex items-center w-4/5 h-7 text-start text-sm hover:bg-white/50">
                    <PauseIcon className="w-4 h-4 mr-2 fill-black"/>
                    <span className="text-xs font-semibold">Pausar</span>
                </button>
                </div>
                </div>

            </div>
        </div>
    )
}