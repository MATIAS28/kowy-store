import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext, DispatchContext } from "../context/userContext/AuthContext"

import { ShippingInfoComponent } from "../components/order/shippingInfo"
import Loader from "../components/loader"
import { Profile } from "../components/user/profile"
import { Orders } from "../components/user/orders"
import { Addresses } from "../components/user/addresses"

import { URL } from "../global"
import { logoutUser } from "../context/userContext/actions"

function User () {
    const dispatch = useContext(DispatchContext)
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [sectionSelector, setSectionSelector] = useState(true)

    const getUserData = async () => {
        try {
        const orders = await axios.get(URL+'orders', {headers:{'auth-token': user}})
        const userData = await axios.get(URL+'user', {headers:{'auth-token': user}})
        
        setUserData({orders: orders.data.orders, user: userData.data.user})
        } catch (e) {
            logoutUser(dispatch)
        }
    }

    useEffect(() => {

        if (!user) {
            navigate('/')
        }

        try {
            if (Object.keys(userData).length == 0) {
                getUserData()
            }
            
        } catch (e) {
            console.log(e)
        }
    },[user, userData])

    if(Object.keys(userData).length == 0){
        return <Loader/>
    }

    return(
    <div className="bg-white">
        <Profile userData={userData} setSectionSelector={setSectionSelector} 
        sectionSelector={sectionSelector}/>

        <div className="flex justify-center w-full h-full py-4">
            {sectionSelector ? 
            
            <div id="user-data" className="w-full md:w-4/5">        
                <Orders orders={userData.orders}/>
            </div>
                :
            <div className="w-full md:w-4/5">
                <Addresses userData={userData}/>
            </div>}
        </div>
    </div>
    )
}

export default User