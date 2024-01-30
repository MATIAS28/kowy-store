import RegisterComponent from "../components/user/RegisterComponent"

function Register(){

    return(
        <div id="register-container" className="min-h-screen bg-gray-50">
            <div id="form-container" className="w-3/6 h-96 mt-12">
            <RegisterComponent/>
            </div>
            

        <style jsx='true'>
            {`
                #register-container{
                    margin: 0px auto;
                    display: flex;
                    justify-content: center;
                    align-items: start;

                }

                @media(max-width: 768px){
                    #register-container{
                        align-items: flex-start;
                    }

                    #form-container{
                        width: 100%;
                        margin: 1.3rem;
                        margin-top: 4rem;    
                    }
                }
            `}
        </style>

        </div>
    )
}

export default Register