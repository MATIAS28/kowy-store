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
    const [shippingInfo, setShippingInfo] = useState(null)
    const [step, setSteps] = useState(0)
    const [btn, setBtn] = useState(true)
    const steps = [<UserOrderComponent  order={true}/>, <ShippingInfoComponent setBtnO={setBtn} shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} token={user} />, <Pay shippingInfo={shippingInfo} token={user} user={user_id} />] 
    

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        if (!user) {
            return setBtn(true)
        }

        if(step > 0 && !shippingInfo) {
           return setBtn(true)
        }

        setBtn(false)

    },[shippingInfo, user, step, cart])

    if(step > 3) return <Error/>

    return(
        <div className="min-h-screen  my-8">
            <ul className="flex justify-center my-4 space-x-2">
                <li  className={`rounded-full p-4 text-sm ${step >= 0 && user ? 'primary' : 'bg-black text-white'}`}>1</li>
                <li  className={`rounded-full p-4 text-sm ${step > 1 ? 'primary'  :  'bg-black text-white'}`}>2</li>
                <li  className={`rounded-full p-4 text-sm ${step == 2 ? 'primary'  :  'bg-black text-white'}`}>3</li>
            </ul>

            <div id="stepper" className="min-h-screen">
                <div className="flex justify-center w-full">
                    {steps[step]}
                </div>
                <div className="flex justify-center mt-7">
                    <button disabled={btn} className="rounded w-72 bg-black text-white py-2 px-4 disabled:opacity-50 text-sm font-semibold"
                    onClick={() => step === 2 ? setSteps(prev => prev-1) : setSteps(prev => prev+1)}>{step === 2 ? 'Atras' : 'Siguiente'} </button>
                </div>
            </div>

        </div>
    )
}

export default Order