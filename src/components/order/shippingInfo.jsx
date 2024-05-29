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
            e.target.classList.add('border-b')
            e.target.classList.add('border-blue-500')
            console.log(e.target.value.length === 0);
        }else{
            e.target.classList.remove('border-b-2')
            e.target.classList.remove('border-red-500')
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
        <div className="rounded p-2 w-3/4 md:w-2/4">
        <h3 className="md:text-2xl font-semibold text-center mb-2">Agrega una direccion</h3>
        <Toaster position="bottom-right" reverseOrder={false}/>

        {/*Direcciones del usuario*/}
        {!userPage && 
            <AddressesComponent shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} token={token}/>
        }

        <form className="md:grid md:grid-cols-2 gap-3" onSubmit={userPage ? saveAddress : AddAdress}>

        <div className="my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="name">
        Nombre
        </label>
        <input className="input-shipping-info text-xs md:text-base" value={shippingInfo?.name} id="name" type="name" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="surname">
        Apellido
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.surname} id="surname" type="surname" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="phone_number">
        Celular
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.phone_number} id="phone_number" type="tel" onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="flex flex-col my-4">
            <label className="text-xs md:text-xs font-semibold mb-2">
                Provincia
            </label>
            <select className="block cursor-pointer w-full p-2 text-xs font-light bg-gray-200 rounded focus:border-red-500 focus:outline-none focus:ring"
            onChange={handleChange} id="province" value={shippingInfo?.province} defaultValue={info.province}>
               {Provinces.map((prov, i) => {
                return(
                    <option key={i} className='cursor-pointer text-xs md:text-sm font-light' value={prov}>{prov.toUpperCase()}</option>
                )
               })}
            </select>
        </div>

        <div className="my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="locality">
        Localidad
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.locality} id="locality"  onBlur={handleBlur} onChange={handleChange}/>
        </div>

        <div className="my-4">
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

        <div className="my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="post_code">
        Codigo Postal
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.post_code || 5400} id="post_code" type="tel"  onBlur={handleBlur} onChange={handleChange}/>
        </div>
        
        <div className="my-4">
        <label className="text-xs md:text-xs font-semibold" htmlFor="dni">
        DNI
        </label>
        <input className="input-shipping-info text-xs md:text-base font-light" value={shippingInfo?.dni} id="dni" type="tel" onBlur={handleBlur} onChange={handleChange}/>
        </div>

    </form>

    <button type="submitt" className="primary rounded  p-2 w-full h-fit  text-center disabled:opacity-50" >
        <span className="text-sm text-semibold text-black">
            {shippingInfo ? 'actualizar' : 'agregar direccion'}
        </span>
    </button>

            <style jsx="true">
            {`
                .input-shipping-info {
                    width: 100%;
                    background: transparent; 
                    border: none;
                    border-bottom: 2px solid black; 
                    outline: none;
                    margin: 0;
                    padding: 0;
                    font-size: inherit;
                    font-family: inherit;
                }
                
                .input-shipping-info:focus {
                  border-bottom: 2px solid #EAEB46; 
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