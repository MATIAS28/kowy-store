import { useState } from "react"
import LoginComponent from "../user/LoginComponent"
import RegisterComponent from "../user/RegisterComponent"
import { ArrowLongRightIcon } from "@heroicons/react/24/solid"

export const UserOrderComponent = () => {
    const [regOrLog, setRegOrLog] = useState(false)
    return(
        <div className="w-3/4 md:w-2/4">
            <div>
                <div style={{display: regOrLog ? 'none' : 'block'}}>
                <LoginComponent isOrder={true}/>
                </div>
                
                <div style={{display: regOrLog ? 'block' : 'none'}}>
                <RegisterComponent isOrder={true}/>
                </div>
            </div>

           <div className="flex justify-end">
           <button className="flex items-center" onClick={() => setRegOrLog(prevState => !prevState)}>
                {regOrLog ?  'Iniciar Sesion': 'Registrarse'}
                <ArrowLongRightIcon className="h-4 w-7" fill="black"/>
            </button>
           </div>
        </div>
    )
} 