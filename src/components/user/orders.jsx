import { NotFoundComponent } from "../notFound"

export const Orders = ({orders}) => {
    return(
        <div className="w-full h-full">
        <h3 className="text-2xl font-semibold p-3 my-2">Tus pedidos</h3>
        
        <div className="grid grid-cols-1 overflow-y-auto h-full space-y-3 p-2">
            {/*No hay ordenes*/}

            {orders.length === 0 && 
                <NotFoundComponent name={'ordenes'}/>
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

                    <div className={`px-4 md:px-4 py-1 md:py-2 my-2 md:my-0 rounded ${order.delivered ? 'primary' : 'secondary text-white'}`}>
                        <h4 className="text-xs font-semibold text-center">{order.delivered ? 'Enviado' : 'En proceso'}</h4>
                    </div>
                </div>

                {/*Productos de las ordenes*/}

                    <div className="p-2 md:p-3 my-3 md:my-0 space-y-2 divide-y">

                        {order.products.map((product, i) => {
                        return(
                        <div key={i} className="flex md:justify-between items-center w-full">
                            <div className="flex w-full py-6">

                                <div className="hidden justify-around items-center bg-gray-100 rounded mr-2 h-fit divide-y">
                                    <span className="text-xs uppercase p-1 px-2">{product.size} </span>
                                    <span className="text-xs p-1 px-2 font-semibold">
                                        X{product.quantity}
                                    </span>
                                </div>

                                <img className="rounded w-20 md:w-20 h-16 md:h-20 mr-2 md:mr-4" src={product.img} alt={product.unit_price} />
                                <div className="w-full md:w-2/4">
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-xs font-semibold secondaryColor">{product.brand} </p>
                                    </div>
                                    <p className="text-xs md:text-sm w-full">{product.name} </p>
                                    <p className="text-xs hidden md:block font-light">{product.description} </p>
                                    <p className="text-xs md:text-sm font-light md:font-semibold block md:hidden">${product.unit_price}</p>
                                </div>
                            </div>

                            <div className="md:w-20 space-y-2">
                                <div className="flex flex-col md:flex-row justify-around items-center md:space-x-2 bg-gray-100 md:p-1 rounded divide-y">
                                    <span className="font-semibold text-xs p-1 px-2 md:px-0 uppercase text-center">{product.size} </span>
                                    <span className="font-semibold text-xs p-1 px-2 md:px-0 text-center">
                                        X{product.quantity}
                                    </span>
                                </div>
                                <p className="text-xs md:text-base font-light text-center hidden md:block">${product.unit_price}</p>
                            </div>

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
