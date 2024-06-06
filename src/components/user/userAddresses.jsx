import { ErrorComponent } from "../error";



export const UserAddresses = ({addresses}) => {
    if(addresses.length == 0) return <ErrorComponent name={'direcciones'}/>
    return(
        <div className="grid grid-cols-4 gap-2 w-full">
            {addresses.length > 0 && 
            addresses.map((address, i) => {
                return(
                    <div key={i} className="bg-white p-4 w-full rounded-md">
                        <h5 className="text-center">Dirección {i+1}</h5>

                        <div className="my-2">
                        <p className="text-xs uppercase text-gray-500">Dirección</p>
                        <p className="text-sm">{address.address}</p>
                        </div>

                        <div className="my-2">
                        <p className="text-xs uppercase text-gray-500">Código postal</p>
                        <p className="text-sm">{address.post_code}</p>
                        </div>

                        <div className="my-2">
                        <p className="text-xs uppercase text-gray-500">número de teléfono</p>
                        <p className="text-sm">{address.post_code}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}