'use client'
import { Toaster } from 'react-hot-toast';
import { LoginComponent } from "@/components/admin/loginAdmin";
import { RegisterComponent } from "@/components/admin/registerAdmin";
import { useState } from "react";
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';



export default function AdminPage (){
    const [changeForm, setChangeForm] = useState(true)

    return(
        <div className='flex justify-center items-center w-full min-h-screen bg-neutral-950'>
            <div className="w-2/4">
            
            <Toaster position="top-right" reverseOrder={false}/>
            
            {changeForm ? 
                <LoginComponent/>
                :
                <RegisterComponent/>
            }

            <div className='flex justify-end  mt-2'>
                <button className="flex items-center text-white" 
                    onClick={() => setChangeForm(prev => !prev)}>
                        {!changeForm ? 'Iniciar Sesión ' : 'Registrar '}
                        <ArrowLongRightIcon className='w-4 ml-2'/>
                </button>
            </div>

            </div>

        </div>
    )
}