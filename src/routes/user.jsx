import { useContext, useEffect, useState } from "react"
import { AuthContext, DispatchContext } from "../context/userContext/AuthContext"
import { ShippingInfoComponent } from "../components/order/shippingInfo"
import axios from "axios"
import Loader from "../components/loader"
import { Profile } from "../components/user/profile"
import { Orders } from "../components/user/orders"
import { Addresses } from "../components/user/addresses"
import { URL } from "../global"

function User () {
    const {user} = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const [sectionSelector, setSectionSelector] = useState(true)

    const getUserData = async () => {
        let orders = await axios.get(URL+'orders', {headers:{'auth-token': user}})
        let userData = await axios.get(URL+'user', {headers:{'auth-token': user}})
        setUserData({orders: orders.data, user: userData.data.user})
    }

    useEffect(() => {
        try {
            if (Object.keys(userData).length == 0) {
                getUserData()
            }
            
        } catch (e) {
            console.log(e)
        }
    },[userData])

    if(Object.keys(userData).length == 0){
        return <Loader/>
    }

    return(
    <div className="block md:flex m-0 md:m-4">
        <Profile userData={userData} setSectionSelector={setSectionSelector} 
        sectionSelector={sectionSelector}/>

        <div className="flex w-full p-0 md:p-2 my-4 md:my-0">
            {sectionSelector ? <div id="user-data" className="">        
                <Orders orders={userData.orders}/>
            </div>
                :
            <div className="rounded h-4/5 bg-gray-100">
                <ShippingInfoComponent userPage={true} token={user}/> 
                <div>
                    <Addresses userData={userData}/>
                </div>
            </div>}
        </div>
    </div>
    )
}

export default User