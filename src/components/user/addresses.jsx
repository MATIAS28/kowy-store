import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { NotFoundComponent } from '../notFound'


export const Addresses = ({userData}) => {
    return(
        <div className='m-2 md:m-0'>
        
        {/*No hay direcciones*/}

        {userData.user && userData.user.addresses.length == 0 && 
        <NotFoundComponent name={'direcciones'}/>}

        {/*Direcciones*/}

        <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
            {userData.user && userData.user.addresses.map((address, i) => {
            return (
            <div key={i} className="border rounded-xl text-lg bg-white divide-y">

                <div className="flex justify-between w-full items-center p-2 my-2">
                <dd className="mt-1 font-semibold text-black">{address.address}</dd>
                </div>

                <div className="flex justify-between w-full items-center p-2 my-2">
                <dt className="text-xs  font-semibold text-gray-500">Nombre</dt>
                <dd className="text-sm foxs-normal text-gray-900">{address.name+' '+address.surname}</dd>
                </div>

                <div className="flex justify-between w-full items-center p-2 my-2">
                <dt className="text-xs  font-semibold text-gray-500">DNI</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.dni}</dd>
                </div>

                <div className="flex justify-between w-full items-center p-2 my-2">
                <dt className="text-xs  font-semibold text-gray-500">Numero de telefono</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.phone_number}</dd>
                </div>

                <div className="flex justify-between w-full items-center p-2 my-2">
                <dt className="text-xs  font-semibold text-gray-500">Provincia</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.province}</dd>
                </div>


                <div className="flex justify-between w-full items-center p-2 my-2">
                <dt className="text-xs font-semibold text-gray-500">Localidad</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.locality}</dd>
                </div>

                <div className="flex justify-between w-full items-center p-2 my-2">
                <dt className="text-xs  font-semibold text-gray-500">Barrio</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.neighborhood}</dd>
                </div>

                <div className="flex justify-between w-full items-center p-2 my-2">
                <dt className="text-sm font-semibold text-gray-500">Codigo Postal</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.post_code}</dd>
            </div>

            </div>
            )
            })}
        </div>
    </div>
    )
}
