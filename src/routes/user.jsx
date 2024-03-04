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

function User () {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [sectionSelector, setSectionSelector] = useState(true)

    const getUserData = async () => {
        const orders = await axios.get(URL+'orders', {headers:{'auth-token': user}})
        const userData = await axios.get(URL+'user', {headers:{'auth-token': user}})
        console.log(orders);
        
        setUserData({orders: orders.data.orders, user: userData.data.user})
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
    <div className="block md:flex">
        <Profile userData={userData} setSectionSelector={setSectionSelector} 
        sectionSelector={sectionSelector}/>

        <div className="flex w-full p-0 w-full md:h-screen">
            {sectionSelector ? 
            
            <div id="user-data" className="w-full h-4/5">        
                <Orders orders={userData.orders}/>
            </div>
                :
            <div className="rounded h-4/5 bg-gray-100 w-full md:h-screen md:overflow-y-auto p-2">
                <ShippingInfoComponent userPage={true} token={user} getUserData={getUserData}/> 
                <div>
                <Addresses userData={userData}/>
                </div>
            </div>}
        </div>
    </div>
    )
}

export default User