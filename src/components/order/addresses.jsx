import { useEffect, useState } from "react"
import { getAddress } from "../../services/user"
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/solid"


export const AddressesComponent = ({shippingInfo ,setShippingInfo, token}) => {
    const [addresses, setAddresses] = useState([])


    const addAddress = (address) => {
        if (shippingInfo == address) {
            setShippingInfo({})
        }else{
            setShippingInfo(address)
        }
    }

    useEffect(() => {
        const getUserAddress = async () => {
            try {
                const userAddress = await getAddress(token)
                userAddress.forEach(address => {
                    delete address._id
                });
                console.log(userAddress);
                setAddresses(userAddress)
            } catch (e) {
                console.error(e);
            }
        }
        getUserAddress()
    }, [])

    return(
        <div className="w-full">
            <h3 className="text-white font-semibold p-2">Tus Direcciones</h3>
            <div className="flex w-full overflow-x-auto p-3">
            {addresses.length > 0 && addresses.map((address, i) => {
            return(
                <div onClick={() => addAddress(address)} 
                className={`flex-shrink-0 flex w-fit h-fit border rounded-lg cursor-pointer hover:shadow-sm mr-4
                ${shippingInfo == address ? 'order-first' : ''}`} key={i}>
                    
                    <div className={`flex items-center justify-center w-fit p-2 duration-300 rounded-l-lg
                    ${shippingInfo == address ? 'primary' : 'secondary'}`}>
                        {shippingInfo == address ? 
                        <XMarkIcon className="w-9 h-9" fill="black"/> 
                        :
                        <MapPinIcon className="w-9 h-9" fill="#EAEB46"/>
                        }
                    </div>

                    <div className="w-full p-2">
                    <p className="text-base text-white font-semibold">{address.name}</p>
                    <p className="text-sm text-white font-bold">{address.locality}</p>
                    <p className="text-xs text-white font-semibold w-full">{address.address}</p>
                    </div>
                </div>
            )
            }) }

            {addresses.length == 0 && 
                <span>No has agregado direcciones</span>
            }
            </div>
        </div>
                
    )
}