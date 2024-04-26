import axios from "axios"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { Provinces, URL } from "../../global"
import { AddressesComponent } from "./addresses"

export const ShippingInfoComponent = ({shippingInfo ,setShippingInfo, userPage, token, getUserData}) => {
    const [btn, setBtn] = useState(true)
    const [info, setInfo] = useState({
        province: 'san juan',
        post_code: 5400
                                    })

    useEffect(() => {
        if (shippingInfo && shippingInfo?.length > 1 ) {
            setInfo(shippingInfo)
        }
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
        
        setInfo({ ...info, [name]: value}) 
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

    const saveAddress = async (e) => {
        toast.loading("Guardando dirección...")
        setBtn(false)
        try {
            e.preventDefault()
            const address = await axios.post(URL+'add-address', {...info}, {headers: {'auth-token': token}})
            if (userPage) {
            getUserData()
            }
            toast.dismiss()
            e.target.reset()
            setInfo({province: 'san juan', post_code: 5400})
            toast.success('La direccion ha sido guardada exitosamente')
            setBtn(true)
        } catch (e) {
            setBtn(true)
            toast.error(e.data)
        }
    }
    
    const AddAdress = (e) => {
        e.preventDefault()

        if (Object.keys(info).length < 9) return toast.error('Faltan datos')

        if (e.address) {
            setShippingInfo(e)
            toast.success('Direccion agregada correctamente, pulsa siguinte para continuar o modificala si es necesario')
        }else{
            e.preventDefault()
            setShippingInfo({...shippingInfo, ...info})
            toast.success('Direccion agregada correctamente, pulsa siguinte para continuar o modificala si es necesario')
        }
    }

    return(
        <div className={`bg-black rounded p-4 mx-0 
        ${userPage ? 'w-full m-4' : 'w-full md:w-3/5'}`}>
        <h3 className="text-white text-2xl font-semibold text-center">Agrega una direccion</h3>
        <Toaster position="bottom-right" reverseOrder={false}/>

        {/*Direcciones del usuario*/}
        {!userPage && 
            <AddressesComponent shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} token={token}/>
        }

        <form className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 p-3 " onSubmit={userPage ? saveAddress : AddAdress}>

        <div className="w-fit my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="name">
        Nombre
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.name} id="name" type="name" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="surname">
        Apellido
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.surname} id="surname" type="surname" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="phone_number">
        Celular
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.phone_number} id="phone_number" type="tel" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="flex flex-col w-fit my-4">
            <label className="text-xs md:text-xs font-semibold mb-2">
                Provincia
            </label>
            <select className="block cursor-pointer w-full p-1 text-xs font-light text-white bg-black rounded-md focus:border-red-500 focus:outline-none focus:ring"
            onChange={handleChange} id="province" value={shippingInfo?.province} defaultValue={info.province}>
               {Provinces.map((prov, i) => {
                return(
                    <option key={i} className='cursor-pointer text-xs md:text-sm font-light' value={prov}>{prov.toUpperCase()}</option>
                )
               })}
            </select>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="locality">
        Localidad
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.locality} id="locality"  onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="neighborhood">
        Barrio
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.neighborhood}  id="neighborhood" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="col-span-2 w-full my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="address">
        Direccion
        </label>
        <input className="input-shipping-info text-xs md:text-base w-full" value={shippingInfo?.address} id="address" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="w-fit my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="post_code">
        Codigo Postal
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.post_code || 5400} id="post_code" type="tel"  onBlur={handleBlur} onChange={handleChange}/>
        </div>
        
        <div className="w-fit my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="dni">
        DNI
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.dni} id="dni" type="tel" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="col-span-2 flex items-end justify-end w-full">
        {userPage ?
               
            <button type="submitt" disabled={!(info && Object.keys(info).length == 9 )} 
            className="flex justify-center items-center primary rounded-xl px-2 py-1 h-fit  disabled:opacity-50" >
                <span className="text-xs md:text-sm text-semibold text-black">agregar direccion</span>
            </button>
            :
            <button type="submitt" className="primary rounded-xl  p-2 w-40 h-fit  text-center disabled:opacity-50" >
                <span className="text-sm text-semibold text-black">
                    {shippingInfo ? 'actualizar' : 'agregar direccion'}
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