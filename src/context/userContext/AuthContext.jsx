import { createContext, useEffect, useState, useReducer } from "react";
import {initialState, userReducer} from "./userReducer";

export const AuthContext =  createContext();
export const DispatchContext = createContext();

const AuthProvider = ({children}) => {
    const [user, dispatch] = useReducer(userReducer, initialState)
    //const [user, setUser] = useState(token);
    //const context = {user, setUser}
    return (<AuthContext.Provider value={user}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </AuthContext.Provider>)
}

export{AuthProvider}