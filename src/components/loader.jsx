const Loader = () => {
 return(
    <div id="loader-container" className="min-h-screen flex justify-center items-center p-1">
        <div className="loader"></div>

        <style jsx="true">
        {`
        #loader-container{
         height: 100%;
         position: relative;
         z-index: -1;
        }

        .loader {
         border: 10px solid transparent;
         border-top: 10px solid rgb(31 41 55);
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