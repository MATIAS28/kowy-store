export const Addresses = ({userData}) => {
    return(
        <div className="mt-12">
            <h3 className="text-2xl font-semibold text-center">Direcciones</h3>
        
        {/*No hay direcciones*/}

        {!userData.user && <div className="flex items-center justify-center w-full h-[18rem]">
        <div className="flex flex-col items-center text-center">
        <ExclamationCircleIcon className="w-7 h-7" fill="gray"/>
        <p className="w-full text-lg my-2 text-gray-400 font-mono">No hay direcciones</p>
        </div>
        </div>}

        {/*Direcciones*/}

        <div id="orders-container" className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {userData.user && userData.user.addresses.map((address, i) => {
            return (
            <div key={i} className="border rounded p-2 text-lg divide-y m-0 md:m-4">

                <div className="flex justify-between w-full items-center py-3 my-2">
                <dd className="mt-1 text-lg font-semibold text-black">{address.address}</dd>
                </div>

                <div className="flex justify-between w-full items-center py-3 my-2">
                <dt className="text-smfont-semibold text-gray-500">Nombre</dt>
                <dd className="text-sm foxs-normal text-gray-900">{address.name+' '+address.surname}</dd>
                </div>

                <div className="flex justify-between w-full items-center py-3 my-2">
                <dt className="text-sm font-semibold text-gray-500">DNI</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.dni}</dd>
                </div>

                <div className="flex justify-between w-full items-center py-3 my-2">
                <dt className="text-sm font-semibold text-gray-500">Numero de telefono</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.phone_number}</dd>
                </div>

                <div className="flex justify-between w-full items-center py-3 my-2">
                <dt className="text-sm font-semibold text-gray-500">Provincia</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.province}</dd>
                </div>


                <div className="flex justify-between w-full items-center py-3 my-2">
                <dt className="text-sm font-semibold text-gray-500">Localidad</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.locality}</dd>
                </div>

                <div className="flex justify-between w-full items-center py-3 my-2">
                <dt className="text-sm font-semibold text-gray-500">Barrio</dt>
                <dd className="mt-1 text-xs font-normal text-gray-900 base:col-span-2 base:mt-0">{address.neighborhood}</dd>
                </div>

                <div className="flex justify-between w-full items-center py-3 my-2">
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