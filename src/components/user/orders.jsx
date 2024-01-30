export const Orders = ({orders}) => {
    return(
        <>
        <h3 className="text-2xl font-semibold p-3">Tus pedidos</h3>
        
        <div className={orders && orders.length > 2 ? 'grid grid-cols-1 divide-y-2 overflow-y-scroll h-[18rem]' : 'flex flex-col h-[16rem]'}>
            
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
            <div key={i} id="orders-container" className="p-4">
                <div className="w-full">
                
                <div id="orders-container" className="flex justify-between items-center w-full rounded mb-2 bg-yellow-200 p-3">
                    <div id="orders-container" className="flex items-center">
                    <h3 className="text-sm font-semibold mr-7">Orden <p className="text-gray-500">#{order._id} </p></h3>
                    <dd className="text-sm font-semibold mr-7">Fecha de compra <p className="text-gray-500 font-semibold">{date.toLocaleDateString()}</p> </dd>
                    <dd className="text-sm font-semibold mr-7">Total <p>${order.totalPrice}</p></dd>
                    </div>
                    <dd className="text-xs font-semibold">Productos {order.products.length}</dd>
                </div>

                {/*Productos de las ordenes*/}

                    <div className="px-2">

                        {order.products.map((product, i) => {
                        return(
                        <div key={i} className="flex justify-between items-center w-full">
                            <div className="flex items-center">
                            <img className="rounded w-12 h-12 mr-4" src={product.img} alt={product.unit_price} />
                            <p className="text-sm font-semibold mr-3">{product.name} </p>
                            <p className="text-sm font-semibold text-gray-500 mr-3">talle:  {product.size} </p>
                            <p className="border p-1 bg-black text-white rounded-full text-xs font-mono">X{product.quantity}</p>
                            </div>
                            <p className="text-xs font-semibold">${product.unit_price}</p>
                        </div>
                        )
                        })}

                    </div>
                </div>
            </div>
            )
            })}
        </div>
        </>
    )
}