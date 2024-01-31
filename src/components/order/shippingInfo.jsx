import axios from "axios"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { URL } from "../../global"
import { MapPinIcon } from "@heroicons/react/24/solid"

export const ShippingInfoComponent = ({shippingInfo ,setShippingInfo, userPage, token, setBtnO}) => {
    const [info, setInfo] = useState(shippingInfo ? shippingInfo : {} )
    const [addresses, setAddresses] = useState([])
    const [btn, setBtn] = useState(true)

    const getAddress = async () => {
        let userData = await axios.get(URL+'user', {headers:{'auth-token': token}})
        setAddresses(userData.data.user.addresses)
    }

    useEffect(() => {
        if(userPage === undefined && addresses.length === 0){
            getAddress()
        }

       if(Object.keys(info).length < 9){
        setBtn(true)
       }else{
        setBtn(false)
       }
    },[info])

    const handleChange = (e) => {
        let name =  e.target.id
        let value = e.target.value

        if(value.length === 0){
            let newObject = info
            delete newObject[name]
            setInfo(newObject)
            setBtn(true)
        }else{
            setInfo({
                ...info,
                [name]: value
            })
        }
        
    } 
    
    const handleBlur = (e) =>{
        if (e.target.value.length === 0) {
            e.target.classList.add('border-b-2')
            e.target.classList.add('border-b-red-500')
        }else{
            e.target.classList.remove('border-b-2')
            e.target.classList.remove('border-b-red-500')
        }
    }

    const AddAdress = async (e) => {
        console.log(info)
        if(userPage){
            try {
                e.preventDefault()
               const address = await axios.post(URL+'add-address', {...info}, {headers: {'auth-token': token}})
               toast.success('La direccion ha sido guardada exitosamente')
               e.target.reset()
            } catch (e) {
                toast.error(e.data)
            }
        }else{
        if (e.address) {
            setShippingInfo(e)
            setBtnO(false)
            toast.success('Direccion agregada correctamente, pulsa siguinte para continuar o modificala si es necesario')
        }else{
            e.preventDefault()
            setShippingInfo({...shippingInfo, ...info})
            toast.success('Direccion agregada correctamente, pulsa siguinte para continuar o modificala si es necesario')
        }
        
        }
    }

    return(
        <div className={`bg-black rounded p-3 mx-0 md:mx-2 
        ${userPage ? 'w-full' : 'w-full md:w-3/5'}`}>
        <h3 className="text-white text-xl font-semibold text-center">Agrega una direccion</h3>
        <Toaster position="top-center" reverseOrder={false}/>

        {/*Direcciones*/}

        { addresses.length > 0 && !userPage && 
        <div className="w-full">
            <h3 className="text-white font-semibold p-2">Tus Direcciones</h3>
            <div className="flex w-full overflow-x-auto space-x-8 p-3">
            {addresses.length > 0 && addresses.map((address, i) => {
            return(
                <div onClick={() => AddAdress(address)} className="flex-shrink-0 flex w-fit h-24 border rounded-lg cursor-pointer hover:shadow-sm" key={i}>
                    <div className={`flex items-center justify-center w-1/3 p-2 duration-300 rounded-l-lg
                    ${shippingInfo == address ? 'primary' : 'secondary'}`}>
                        <MapPinIcon className="w-12 h-12"/>
                    </div>
                    <div className="p-2">
                    <p className="text-lg text-white font-semibold">{address.name}</p>
                    <p className="text-sm text-white font-bold">{address.locality}</p>
                    <p className="text-xs text-white font-semibold">{address.address}</p>
                    </div>
                </div>
            )
            }) }
            </div>
            </div>
            }

        <form className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 p-3 " onSubmit={AddAdress}>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="name">
        Nombre
        </label>
        <input className="input-shipping-info text-xs md:text-base" defaultValue={shippingInfo?.name} id="name" type="name" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="surname">
        Apellido
        </label>
        <input className="input-shipping-info text-xs md:text-base" defaultValue={shippingInfo?.surname} id="surname" type="surname" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="phone_number">
        Celular
        </label>
        <input className="input-shipping-info text-xs md:text-base" defaultValue={shippingInfo?.phone_number} id="phone_number" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="province">
        Provincia
        </label>
        <input className="input-shipping-info text-xs md:text-base" defaultValue={shippingInfo?.province} id="province" type="province" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="locality">
        Localidad
        </label>
        <input className="input-shipping-info text-xs md:text-base" defaultValue={shippingInfo?.locality} id="locality" type="tel"  onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="neighborhood">
        Barrio
        </label>
        <input className="input-shipping-info text-xs md:text-base" defaultValue={shippingInfo?.neighborhood}  id="neighborhood" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="col-span-2 w-full my-4">
        <label className="text-xs md:text-base" htmlFor="address">
        Direccion
        </label>
        <input className="input-shipping-info text-xs md:text-base w-full" defaultValue={shippingInfo?.address} id="address" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="post_code">
        Codigo Postal
        </label>
        <input className="input-shipping-info text-xs md:text-base" defaultValue={shippingInfo?.post_code} id="post_code" type="tel"  onBlur={handleBlur} onChange={handleChange}/>
        </div>
        
        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="dni">
        DNI
        </label>
        <input className="input-shipping-info text-xs md:text-base" defaultValue={shippingInfo?.dni} id="dni" type="tel" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="col-span-2 flex items-end justify-end w-full">
        <button type="submitt" disabled={btn} 
        className="primary rounded-xl text-sm p-2 w-40 h-fit text-semibold text-black text-center" >
            Agregar Direccion
        </button>
        </div>

    </form>

            <style jsx="true">
            {`
                label{
                    color: white;
                }

                .input-shipping-info {
                    width: 100%;
                    background: transparent; 
                    border: none;
                    border-bottom: 2px solid #EAEB46; 
                    outline: none;
                    margin: 0;
                    padding: 0;
                    font-size: inherit;
                    font-family: inherit;
                    color: white;
                }
                
                .input-shipping-info:focus {
                  border-bottom: 2px solid white; 
                }

                .address{
                    width: 22rem;
                }

                @media(max-width: 768px){
                    .m{
                        width: 100%;
                    }

                    .address{
                            width: 22rem;
                    }
                }
            `}
            </style>

        </div>
    )
}