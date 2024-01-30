import Navbar from './components/partials/navbar'
import Footer from './components/partials/footer'
import { useEffect, useState } from 'react'

import './App.css'
import './index.css'
import AppRoutes from './app-routes'
import { AuthProvider } from './context/userContext/AuthContext'
import { CartProvider } from './context/cartContext/cartContext'
import Cart from './components/cart/cart'
import { SearchComponent } from './components/search/search'
import { useLocation } from 'react-router-dom'
import { MobileNavbar } from './components/partials/mobileNavbar'


function App() {
  const [search, setSearch] = useState(null)
  const location = useLocation()
  useEffect(() => {
    setSearch(null)
  }, [location])

  return (
    <AuthProvider>
      <CartProvider>
      <Navbar setSearch={setSearch} search={search}/>
      <MobileNavbar setSearch={setSearch} search={search}/>
      <Cart/>
      <div className='min-h-screen z-10' >
      {search && search.length ? 
        <SearchComponent search={search}/>
        :
        <AppRoutes/>
        
      }
      </div>
      <Footer/>
    </CartProvider>
  </AuthProvider>
  )
}

export default App
