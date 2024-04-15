import { ShoppingBagIcon, UserIcon, 
         MagnifyingGlassIcon, XCircleIcon, Bars3Icon, XMarkIcon} from '@heroicons/react/24/solid'
import '../../assets/css/navbar.css'

import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../context/userContext/AuthContext'
import { cartContext } from '../../context/cartContext/cartContext'
import { getFilters } from '../../services/products'


export const MobileNavbar = ({setSearch, search}) => {
    const [expand, setExpand] = useState(false)
    const [isLoged, setIsLoged] = useState('white')
    const {user} = useContext(AuthContext)
    const {cart, expandCart, setExpandCart} =  useContext(cartContext)
    const [expandCategories, setExpandCategories] = useState(null)
    const [productsCount, setProductsCount] = useState(0)
    const [categories, setCategories] = useState({})


    const getAllFilters = async () => {
      try {
          const Filters = await getFilters()
          setCategories(Filters.categories)
      } catch (e) {
          console.log(e);
      }
  }
    
    useEffect(() => {
      let suma = 0
      cart.map((item) => suma += item.quantity)
      setProductsCount(suma)
      user != undefined ? setIsLoged('#EAEB46') : setIsLoged('white')
      getAllFilters()
    }, [user, cart])
  
    return(
        <nav id='navbar-mobile' className="sticky top-0 w-full z-40">
          <div className="relative z-30 flex-col w-full items-center justify-between space-x-2 p-2 bg-black">

            <div className='flex justify-between items-center w-full'>
              
              <Link to='/' id='logo' className='mx-3 p-2'>
              <img className="w-32 h-16"  src="/kowy.jpg" alt=""/>
              </Link>


            <div className="flex items-center space-x-2 mx-2">

            <Link to={user != undefined ? '/user' : '/login'}>
            <UserIcon className="h-6 w-6" fill={isLoged}/>
            </Link>


            <button className=' flex items-center duration-75 ease-in-out w-fit h-12' 
            onClick={() => setExpandCart(prevState => prevState === 'slide-in' ? 'slide-out' : 'slide-in')}>
            <ShoppingBagIcon className="h-6 w-6" fill='white'/>
            {cart.length > 0 && <span className='text-lg mx-1 text-white'>{productsCount}</span>}
            </button>

            <button className='flex items-center' 
                onClick={() => setExpandCategories(prev => !prev)}>
                <Bars3Icon className="w-6 h-6 rotate-button" fill='white'/>
            </button>
              
            </div>

            </div>

            <div className='flex items-center bg-white p-2 rounded-lg my-3'>
              <MagnifyingGlassIcon className='w-5 h-5 mx-2' fill='gray'/>
              <input onChange={(e) => setSearch(e.target.value)} value={search} className='focus:outline-none w-full font-base' placeholder='¿Que estas buscando?' type="text"/>
              <button className='' onClick={() => setSearch('')}>
                <XCircleIcon className='w-5 h-5' fill='#8b0000'/>
              </button>
            </div>
            
          </div>

          {expandCategories != null && 
          
          <div id={expandCategories ? 'slide-right' : 'slide-left'}
          className='fixed flex top-0 w-full text-white text-lg font-base z-40'>
            <div className='flex-col w-3/5 min-h-screen secondary p-4'>
                
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl'>Categorias</h2>
                    <button className='flex items-center' 
                        onClick={() => setExpandCategories(prev => !prev)}>
                        <XMarkIcon className='w-6 h-6'/>
                    </button>
                </div>
          
                <div className='flex flex-col space-y-1 text-white w-full font-light my-4'>
                  {categories && categories.length > 0 &&
                  categories.map((category, i) => {
                    return(
                      <Link to={{pathname:'/products', search: category}} 
                      onClick={() => setExpandCategories(null)} className='duration-200 text-lg hover:border-b-2 uppercase'>
                        {category}
                      </Link>
                    )
                  })}
                </div>  

            </div>
          </div>  

          }

        </nav>
    )
}