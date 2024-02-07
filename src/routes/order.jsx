import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/userContext/AuthContext"
import Error from "../components/error404"
import { UserOrderComponent } from "../components/order/user"
import { ShippingInfoComponent } from "../components/order/shippingInfo"
import { Pay } from "../components/order/pay"
import { cartContext } from "../context/cartContext/cartContext"

function Order(){
    const {user, user_id} = useContext(AuthContext)
    const {cart} = useContext(cartContext)
    const [shippingInfo, setShippingInfo] = useState({})
    const [step, setSteps] = useState(0)
    const [btn, setBtn] = useState(false)
    const steps = [<UserOrderComponent  order={true}/>, <ShippingInfoComponent setBtnO={setBtn} shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} token={user} />, <Pay shippingInfo={shippingInfo} token={user} user={user_id} />] 
    

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        if(step >= 0 && !user) {
            setSteps(0)
        }

        if(step > 1 && Object.keys(shippingInfo).length < 9) {
            setSteps(1)
        }

        if(step == 1 && Object.keys(shippingInfo).length < 9) {
            setBtn(true)
        }

        if(step == 1 && Object.keys(shippingInfo).length >= 9) {
            setBtn(false)
        }

        if(step == 0 && !user) {
            setBtn(true)
        }

        if(step == 0 && user) {
            setBtn(false)
        }

    },[shippingInfo, user, step, cart])
    
    if(step > 3) return <Error/>

    return(
        <div id="order-container" className="flex flex-col justify-center pt-8 pb-4 min-h-screen">
            <ul className="flex justify-center my-4 space-x-2">
                <li  className={`rounded-3xl p-4 ${step >= 0 && user ? 'primary' : 'bg-black text-white'}`}>1</li>
                <li  className={`rounded-3xl p-4 ${step > 1 ? 'primary'  :  'bg-black text-white'}`}>2</li>
                <li  className={`rounded-3xl p-4 ${step == 2 ? 'primary'  :  'bg-black text-white'}`}>3</li>
            </ul>

            <div id="stepper" className="px-8 min-h-screen">
                <div className="md:flex justify-center w-full">
                    {steps[step]}
                </div>
                <div className="flex justify-center mt-7">
                    <button disabled={btn} className="rounded w-72 bg-black primaryColor py-2 px-4 disabled:opacity-50"
                    onClick={() => step === 2 ? setSteps(prev => prev-1) : setSteps(prev => prev+1)}>{step === 2 ? 'Atras' : 'Siguiente'} </button>
                </div>
            </div>

        </div>
    )
}

export default Order