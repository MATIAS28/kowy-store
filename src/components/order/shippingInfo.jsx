import axios from "axios"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { URL } from "../../global"
import { AddressesComponent } from "./addresses"

export const ShippingInfoComponent = ({shippingInfo ,setShippingInfo, userPage, token, getUserData}) => {
    const [btn, setBtn] = useState(true)
    const [info, setInfo] = useState({})

    useEffect(() => {
        if (shippingInfo && shippingInfo?.length > 1 ) {
            setInfo(shippingInfo)
        }

        console.log(shippingInfo);
    },[shippingInfo])

    const handleChange = (e) => {
        let name =  e.target.id
        let value = e.target.value

        if(value.length === 0){
            let newObject = info
            delete newObject[name]
            setInfo(newObject)
            setBtn(true)
        }
        
        userPage ? setInfo({ ...info, [name]: value}) : setShippingInfo({ ...shippingInfo, [name]: value})
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
        if(userPage){
            try {
                e.preventDefault()
               const address = await axios.post(URL+'add-address', {...info}, {headers: {'auth-token': token}})
               toast.success('La direccion ha sido guardada exitosamente')
               if (userPage) {
                getUserData()
               }
               e.target.reset()
            } catch (e) {
                toast.error(e.data)
            }
        }else{

        if (e.address) {
            setShippingInfo(e)
            toast.success('Direccion agregada correctamente, pulsa siguinte para continuar o modificala si es necesario')
        }else{
            e.preventDefault()
            setShippingInfo({...shippingInfo, ...info})
            toast.success('Direccion agregada correctamente, pulsa siguinte para continuar o modificala si es necesario')
        }
        
        }
    }

    return(
        <div className={`bg-black rounded p-4 mx-0 md:mx-2 
        ${userPage ? 'w-full m-4' : 'w-full md:w-3/5'}`}>
        <h3 className="text-white text-2xl font-semibold text-center">Agrega una direccion</h3>
        <Toaster position="top-center" reverseOrder={false}/>

        {/*Direcciones del usuario*/}
        {!userPage && 
            <AddressesComponent shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} token={token}/>
        }

        <form className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 p-3 " onSubmit={AddAdress}>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="name">
        Nombre
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.name} id="name" type="name" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="surname">
        Apellido
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.surname} id="surname" type="surname" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="phone_number">
        Celular
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.phone_number} id="phone_number" type="tel" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="province">
        Provincia
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.province} id="province" type="province" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="locality">
        Localidad
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.locality} id="locality"  onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="neighborhood">
        Barrio
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.neighborhood}  id="neighborhood" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="col-span-2 w-full my-4">
        <label className="text-xs md:text-base" htmlFor="address">
        Direccion
        </label>
        <input className="input-shipping-info text-xs md:text-base w-full" value={shippingInfo?.address} id="address" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="post_code">
        Codigo Postal
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.post_code} id="post_code" type="tel"  onBlur={handleBlur} onChange={handleChange}/>
        </div>
        
        <div className="w-fit my-4">
        <label className="text-xs md:text-base" htmlFor="dni">
        DNI
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.dni} id="dni" type="tel" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="col-span-2 flex items-end justify-end w-full">
        {userPage ?
               
            <button type="submitt" disabled={!(info && Object.keys(info).length == 9 )} 
            className="primary rounded-xl  p-2 w-40 h-fit  text-center disabled:opacity-50" >
                <span className="text-sm text-semibold text-black">agregar direccion</span>
            </button>
            :
            <button type="submitt" disabled={!(shippingInfo && Object.keys(shippingInfo).length == 9)} 
            className="primary rounded-xl  p-2 w-40 h-fit  text-center disabled:opacity-50" >
                <span className="text-sm text-semibold text-black">
                    {!btn ? 'actualizar' : 'agregar direccion'}
                </span>
            </button>
        }
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