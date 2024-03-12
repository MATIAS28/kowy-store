


export const ErrorComponent = ({name}) => {
    return(
        <div className="flex justify-center items-center p-4">
            <div>
                <h2 className="text-5xl font-bold text-center my-2">4 0 4</h2>
                <p className="text-lg text-center font-ligt">No se encontraron {name}</p>
                <p className="text-sm  text-gray-500 font-ligt">abre la consola para ver los errores</p>
            </div>
        </div>
    )
}