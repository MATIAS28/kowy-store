import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'

const Footer = () => {
    return(
        <div className="flex justify-center items-center w-full md:h-[12rem] border-t p-2 md:p-0">

            <div className="md:flex justify-between items-start md:w-4/5 space-y-7 md:space-y-0">
                <div>
                    <h1 className="text-lg md:text-3xl uppercase font-bold">kowy store</h1>
                    <p className="text-sm md:text-base text-gray-500">Vistiéndote con estilo y elegancia en cada paso.</p>
                </div>
                
                <div className="md:flex justify-between items-center">
                    <div>
                        <h2 className="text-base md:text-lg font-semibold mb-2">Contactános</h2>
                        <div className='flex items-center mb-1'>
                        <PhoneIcon className='w-4 mr-2'/>
                        <span className='text-sm md:text-base'>+54 9 2646 92-2880</span>
                        </div>

                        <div className='flex items-center'>
                        <MapPinIcon className='w-4 mr-2'/>
                        <span className='text-sm md:text-base'>España 143 Sur, San Juan, Argentina </span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-base md:text-lg font-semibold mb-2">Síguenos en</h2>
                    <a className='flex items-center' target='_blank'
                    href='https://www.instagram.com/kowy.store?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
                    <img className='w-4 h-4 mr-1' src="/logo-ig.png" alt="" />
                    <span className='text-sm font-semibold text-blue-700'>Instagram</span>
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Footer