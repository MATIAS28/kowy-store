import { useRoutes } from "react-router-dom";
import { useEffect } from 'react'

import ProductRoute from "./routes/product"
import Error from "./components/error404";
import Home from './routes/home'
import Products from "./routes/products";
import Login from "./routes/login";
import Register from "./routes/register";
import Order from "./routes/order";
import User from "./routes/user";


function AppRoutes(){
    const routes = useRoutes([
        {path:'/',element:<Home/>},
        {path: '/products', element: <Products/>},
        {path:'/product/:id',element:<ProductRoute/>},
        {path: '/login', element:<Login/>},
        {path: '/order', element: <Order/>},
        {path: '/register', element:<Register/>},
        {path: '/user', element: <User/>},
        {path:'/*',element:<Error/>}
    ])

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, [routes])

    return routes
}

export default AppRoutes