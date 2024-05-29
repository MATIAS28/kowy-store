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
        <div className="flex justify-center h-fit md:min-h-screen">
        <div className="w-4/5 lg:w-2/4">
        <LoginComponent/>
        </div>
        </div>
    )
}

export default Login