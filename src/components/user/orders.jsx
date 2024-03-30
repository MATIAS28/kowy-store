import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

export const Orders = ({orders}) => {
    return(
        <div className="w-full h-full">
        <h3 className="text-2xl font-semibold p-3 my-2">Tus pedidos</h3>
        
        <div className="grid grid-cols-1 overflow-y-auto h-full space-y-3 p-2">
            {/*No hay ordenes*/}

            {orders.length === 0 && 
                <div className="flex items-center justify-center w-full h-24">
                <div className="flex flex-col items-center text-center">
                <ExclamationCircleIcon className="w-7 h-7" fill="gray"/>
                <p className="w-full text-lg my-2 text-gray-400 font-mono">No tienes Ordenes</p>
                </div>
                </div>
            }

            {/*Ordenes*/}

            {orders && orders.length > 0 && orders.map((order, i) => {
            let date = new Date(order.createdAt)
            return (
            <div key={i} className="border-2 rounded-lg bg-white">
                <div className="w-full">
                
                <div className="lg:flex justify-between items-center w-full rounded p-3 border-b">
                    <div className="md:flex items-center space-y-3 md:space-y-0">
                    
                        <div className="md:mr-6">
                            <h3 className="secondaryColor text-base font-semibold">Orden</h3>
                            <p className="text-gray-500 text-sm">#{order._id} </p>
                        </div>

                        <div className="md:mr-6">
                            <dd className="secondaryColor text-base font-semibold">Fecha de compra</dd>
                            <p className="text-gray-500 text-sm">{date.toLocaleDateString()}</p>
                        </div>

                        <div className="md:mr-6">
                            <dd className="secondaryColor text-base font-semibold">Total</dd>
                            <p className="text-gray-500 text-sm">${order.totalPrice}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <dd className="secondaryColor text-sm font-semibold">Productos</dd>
                            <dd className="text-sm"> {order.products.length}</dd>
                        </div>

                        

                    </div>

                    <div className={`px-4 md:px-7 py-1 md:py-2 my-2 md:my-0 rounded-3xl ${order.delivered ? 'primary' : 'secondary text-white'}`}>
                        <h4 className="text-sm text-center">{order.delivered ? 'Enviado' : 'En proceso'}</h4>
                    </div>
                </div>

                {/*Productos de las ordenes*/}

                    <div className="p-2 md:p-3 my-3 md:my-0">

                        {order.products.map((product, i) => {
                        return(
                        <div key={i} className="flex md:justify-between items-center w-full">
                            <div className="flex w-full">
                                <img className="rounded w-16 md:w-28 h-16 md:h-28 mr-2 md:mr-4" src={product.img} alt={product.unit_price} />
                                <div className="w-full md:w-2/4">
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-sm font-semibold secondaryColor">{product.brand} </p>
                                        <div className="flex items-center space-x-2 primary px-2 py-[0.2rem] md:py-1 rounded-3xl">
                                            <p className="font-semibold text-xs">{product.size} </p>
                                            <p className="font-semibold text-xs">
                                                X{product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-base md:text-lg font-medium">{product.name} </p>
                                    <p className="text-xs font-medium hidden md:block">{product.description} </p>
                                    <p className="text-sm md:text-sm font-semibold block md:hidden">${product.unit_price}</p>
                                </div>
                            </div>
                            <p className="text-xs md:text-sm font-semibold hidden md:block">${product.unit_price}</p>
                        </div>
                        )
                        })}

                    </div>
                </div>
            </div>
            )
            })}
        </div>
        </div>
    )
}
