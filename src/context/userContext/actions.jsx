import axios from "axios"
const URL = import.meta.env.VITE_URL || 'http://localhost:3001/api/'

export async function registerUser({...userToRegister}){
    const register = await axios.post(URL+'register/', userToRegister)
    return register
}
 
export async function loginUser(dispatch, {email, password}){
        const user = await axios.post(URL+'login/', {email: email, password: password})
        localStorage.setItem('user', JSON.stringify({user: user.data.token, user_id: user.data.id}))
        if (user.data.token && user.data.token) {
            dispatch({type: 'LOGIN_USER', user: user.data.token, user_id: user.data.id})
        }
}

export async function logoutUser(dispatch){
    dispatch({type: 'LOGOUT_USER'})
    localStorage.removeItem('user')
}