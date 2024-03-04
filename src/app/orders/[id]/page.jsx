import { ChevronDownIcon, TruckIcon, UserIcon } from "@heroicons/react/24/solid";



export default function OrderPage(){
    return(
        <div className="p-4">
            <h1 className="my-4">Orden</h1>

            <div className="w-full h-screen bg-white/25 p-4 rounded-xl drop-shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xl">Orden ID: #Y4J32Y4V23YJ</span>
                        <span className="text-sm text-gray-700 font-semibold">08/09/2024</span>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-white rounded-xl">
                        <span className="text-sm mr-1">Estado</span>
                        <ChevronDownIcon className="w-5 h-5"/>
                    </button>
                </div>

                <div className="flex items-center justify-between m-4 my-8">
                    <div className="flex items-start">
                        <div className="mr-4">
                        <UserIcon className="w-16 h-16 primary p-4 rounded-full"/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold text-gray-700">Usuario</span>
                            <span className="text-xl">Nombre: Matias Muñoz</span>
                            <span className="text-xl">Email: matias@matias.com</span>
                            <span className="text-xl">Telefono: 2649807932</span>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="mr-4">
                        <TruckIcon className="w-16 h-16 primary p-4 rounded-full"/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold text-gray-700">Información de envío</span>
                            <span className="text-xl">Dirección: Mendoza sur 122 E, trinidad</span>
                            <span className="text-xl">Departameto: Trinidad</span>
                            <span className="text-xl">Código postal: 5400</span>
                        </div>
                    </div>
                </div>

                <div className="my-2">
                    <span className="text-lg font-seibold">Productos</span>
                    <table className="w-full text-left rounded-lg border-collapse overflow-hidden">
            <thead className="text-xs text-white uppercase bg-black">
                <tr>
                    <th className="p-4">Nombre</th>
                    <th className="p-4 w-1/4">Talle</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                    <tr className="text-sm hover:bg-white/25 cursor-pointer">
                        <td className="p-4">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCZ4rYYuUN_yLePIu9IAldgtgbSUJOPRK5hWm-33aEnQ&s" alt="" />
                        <span>Remera Gucci</span>
                        </td>
                        <td className="p-4">XL</td>
                        <td className="p-4 w-24 truncate overflow-hidden">$50.000</td>
                        <td className="p-4">8</td>
                    </tr>
            </tbody>
        </table>
                </div>

            </div>
        </div>
    )
}