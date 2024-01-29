import { ShoppingBagIcon, UserIcon, 
        Bars3BottomLeftIcon, MagnifyingGlassIcon, 
        ChevronUpIcon, 
        XCircleIcon} from '@heroicons/react/24/solid'
import '../../assets/css/navbar.css'

import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../context/userContext/AuthContext'
import { cartContext } from '../../context/cartContext/cartContext'

const Navbar  = ({setSearch, search}) => {
  const [expand, setExpand] = useState(false)
  const [isLoged, setIsLoged] = useState('white')
  const {user} = useContext(AuthContext)
  const {cart, expandCart, setExpandCart} =  useContext(cartContext)
  const [expandCategories, setExpandCategories] = useState(null)
  const [productsCount, setProductsCount] = useState(0)
  
  useEffect(() => {
    let suma = 0
    cart.map((item) => suma += item.quantity)
    setProductsCount(suma)
    user != undefined ? setIsLoged('#EAEB46') : setIsLoged('white')
  }, [user, cart])

    return(
        <nav id='navbar-desktop' className="sticky top-0 w-full drop-shadow z-40">
          <div className="relative z-30 flex w-full items-center justify-between space-x-2 p-2 bg-black">

            <div className='flex items-center'>
              <Link to='/' id='logo' className='mx-3'>
              <img className="w-full h-16"  src="/kowy.jpg" alt=""/>
              </Link>

              <div>
              <button className='flex items-center' 
                onClick={() => setExpandCategories(prev => !prev)}>
                <span className='text-2xl font-semibold primaryColor mx-2'>catalogo</span>
                <ChevronUpIcon className={`w-6 h-6 primaryColor rotate-button ${expandCategories ? 'rotateDown' : ''}`}/>
              </button>
              </div>

            </div>

            <div className='flex items-center space-x-2 bg-white p-2 w-2/4 rounded-lg'>
              <MagnifyingGlassIcon className='w-5 h-5' fill='gray'/>
              <input onChange={(e) => setSearch(e.target.value)} value={search} className='focus:outline-none w-full font-base' placeholder='¿Que estas buscando?' type="text"/>
              <button className='' onClick={() => setSearch('')}>
                <XCircleIcon className='w-5 h-5' fill='#8b0000'/>
              </button>
            </div>
            
            <div className="btn-container">
            <ul id='btn-menu' className='flex items-center'>

            <li className='btn transition duration-75 ease-in-out mr-7'>
                <a target='_blank'
                href='https://www.instagram.com/kowy.store?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
                <img className='w-6 h-6' src="/logo-ig.png" alt="" />
                </a>
            </li>

            <li className='btn transition duration-75 ease-in-out mr-7'>
                <Link to={user != undefined ? '/user' : '/login'}>
                <UserIcon className="h-6 w-6" fill={isLoged}/>
                </Link>
            </li>


              <div className='cart-menu'>
              <li className='btn flex items-center duration-75 ease-in-out w-12 h-12' onClick={() => setExpandCart(prevState => prevState === 'slide-in' ? 'slide-out' : 'slide-in')}>
                <ShoppingBagIcon className="h-6 w-6" fill='white'/>
                {cart.length > 0 && <span className='text-lg ml-1 text-white'>{productsCount}</span>}
              </li>
              
              <li className='btn hidden'>
                <a onClick={() => setExpand(!expand)}>
                <Bars3BottomLeftIcon className="h-7 w-7 fill-white"/>
                </a>
              </li>
              </div>
            </ul>
            </div>
          </div>

          {expandCategories != null && 
          
          <div id={!expandCategories ? 'slide-top' : 'slide-bottom'} className='categories justify-center items-center space-x-2 p-2 text-white text-lg font-base w-full border-t'>
            <Link to='/' id='logo' className='mx-3'>
              <p>Remeras</p>
            </Link>
            <Link to='/' id='logo' className='mx-3'>
              <p>Bermudas</p>
            </Link>
            <Link to='/' id='logo' className='mx-3'>
              <p>Pantalones</p>
            </Link>
          </div>  

          }

        </nav>
    )
}

export default Navbar