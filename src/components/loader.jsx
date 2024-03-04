const Loader = () => {
 return(
    <div id="loader-container" className="h-screen w-full flex justify-center items-center">
        <div className="loader animate-spin h-full flex justify-center items-center h-screen"></div>

        <style jsx="true">
        {`
        #loader-container{
         position: relative;
         z-index: -1;
        }

        .loader {
         border: 10px solid transparent;
         border-top: 10px solid #EAEB46;
         border-radius: 50%;
         width: 80px;
         height: 80px;
         animation: spin 1s linear infinite;
       }

        `}
        </style>
    </div>
 )
}

export default Loader