


export const NewArrivalsComponent = () => {
    return(
        <div id="c" className="flex items-center justify-center h-fit my-4 w-full primary p-3 md:p-5">
            <div className="md:flex items-center md:w-4/5 md:h-[30rem]">

                <div className="relative flex-col w-full md:w-2/5 primary h-full md:h-[24rem] md:mx-4">
                    <h4 className="text-lg md:text-xl secondaryColor">Nuevos Ingresos</h4>
                    <p className="text-xs md:text-lg my-3">
                        ¡Descubre la emoción de lo nuevo cada mes! 
                        Explora nuestras últimas creaciones y 
                        tendencias frescas que transformarán tu experiencia de compras. 
                        ¡Renovamos nuestra colección mensualmente para ofrecerte siempre 
                        lo mejor y más emocionante!
                    </p>

                    <div className="md:absolute bottom-0 hidden md:flex items-center justify-center my-4 w-full">
                        <button className="w-full bg-white p-1 md:p-2 rounded-2xl text-xs md:text-sm">
                            Ver nuevos ingresos
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full h-80 md:h-[24rem] md:p-2">

                    <img className="w-full h-full rounded" src="https://img.freepik.com/fotos-premium/zapatillas-mujer-blancas-inserciones-coral-colgando-pared-tablones-madera-rustica-marron-vertical_349071-846.jpg?w=2000" alt=""/>
                    <img className="w-full h-full rounded" src="https://img.freepik.com/psd-premium/nuevas-zapatillas-deporte-llegada-zapatos-gran-venta-banner-vertical-historia-instagram_674759-78.jpg?w=2000" alt=""/>
                    <img className="w-full h-full rounded" src="https://img.freepik.com/fotos-premium/zapatillas-mujer-blancas-inserciones-coral-colgando-pared-tablones-madera-rustica-marron-vertical_349071-846.jpg?w=2000" alt=""/>

                </div>
                
                <div className="md:absolute bottom-0 flex md:hidden  items-center justify-center my-4 w-full">
                        <button className="w-full md:w-4/5 bg-white p-1 md:p-2 rounded-2xl text-xs md:text-sm">
                            Ver nuevos ingresos
                        </button>
                    </div>

            </div>
        </div>
    )
}