import RegisterComponent from "../components/user/RegisterComponent"

function Register(){

    return(
        <div className="flex justify-center h-fit md:min-h-screen">
            <div className="w-4/5 lg:w-2/4">
            <RegisterComponent/>
            </div>
        </div>
    )
}

export default Register