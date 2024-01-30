import { useState } from "react"
import LoginComponent from "../user/LoginComponent"
import RegisterComponent from "../user/RegisterComponent"
import { ArrowLongRightIcon } from "@heroicons/react/24/solid"

export const UserOrderComponent = () => {
    const [regOrLog, setRegOrLog] = useState(false)
    return(
        <>
        <div id="orderUser-conatiner" className="flex flex-col w-2/4">
            <div style={{display: regOrLog ? 'none' : 'block'}}>
            <LoginComponent b={false}/>
            </div>
            
            <div style={{display: regOrLog ? 'block' : 'none'}}>
            <RegisterComponent b={false}/>
            </div>

           <div className="flex justify-end">
           <button className="flex items-center" onClick={() => setRegOrLog(prevState => !prevState)}>
                {regOrLog ?  'Iniciar Sesion': 'Registrarse'}
                <ArrowLongRightIcon className="h-4 w-7" fill="black"/>
            </button>
           </div>
        </div>

        <style jsx="true">
        {`
             @media(max-width: 768px){
                #orderUser-conatiner{
                    width: 100%;
                    padding: 0.7rem;
                    border-radius: 2px;
                }

                .shadow-md{
                    box-shadow: none;
                }
            }
        `}
        </style>

        </>
    )
} 