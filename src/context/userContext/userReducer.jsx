import { useReducer } from "react";

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined

export const initialState = {
    ...user

}

export function userReducer (initialState, action){
    switch(action.type){
        case 'LOGIN_USER':
        return {
            user: action.user,
            user_id: action.user_id
        }
        
        case 'LOGOUT_USER': 
        return{
            user: undefined
        }

        default:
			return 'Default return'
    }
}

