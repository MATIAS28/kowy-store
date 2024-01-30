import { useEffect, useContext } from "react"
import LoginComponent from "../components/user/LoginComponent"
import {AuthContext, DispatchContext} from "../context/userContext/AuthContext"
import { useNavigate } from "react-router-dom"


function Login(){
    const Navigate = useNavigate()
    const {user} = useContext(AuthContext)
    useEffect(() => {
        if(user != undefined){
            Navigate('/')
        }
    }, [])

    return(
        <div id="login-container" className="min-h-screen bg-gray-50">
            <div id="form-container" className="w-3/6 h-96">
            <LoginComponent/>
            </div>
            

        <style jsx='true'>
            {`
                #login-container{
                    margin: 0px auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }

                @media(max-width: 768px){
                    #login-container{
                        align-items: flex-start;
                    }

                    #form-container{
                        width: 100%;
                        margin: 1.3rem;
                        margin-top: 4rem;    
                    }
                }
            `}
        </style>

        </div>
    )
}

export default Login