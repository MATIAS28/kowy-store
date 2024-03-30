import ArticleCarousel from "../components/article-carousel/article-carousel"
import Carousel from "../components/home/carousel"
import { NewArrivalsComponent } from "../components/new-arrivals/newArrivals"

function Home(){
    return(        
        <>
            <div className="flex-col md:grid grid-cols-3 gap-6 secondary gap-2 w-full h-fit p-4 space-y-10 md:space-y-0">
                <div className="w-full h-fit">
                <img className="w-full h-[28rem] rounded-lg" src="https://http2.mlstatic.com/D_NQ_NP_846926-MLA71831778172_092023-O.webp" alt=""/>
                    <div className="flex justify-center">
                        <p className="text-3xl text-white font-bold">REMERAS</p>
                    </div>
                </div>

                <div className="w-full h-fit">
                <img className="w-full h-[28rem] rounded-lg" src="https://media.gq.com.mx/photos/634ebd53a63990b8f011d8fc/16:9/w_1600,c_limit/como-usar-pantalones-cargo-en-epoca-de-frio.jpg" alt=""/>
                <div className="flex justify-center">
                    <p className="text-3xl text-white font-bold">PANTALONES</p>
                </div>
                </div>

                <div className="w-full h-fit">
                <img className="w-full h-[28rem] rounded-lg" src="https://jungleindumentaria.co/wp-content/uploads/2022/05/buzo-con-capota-Nasa-gris-jaspe-680x1020.jpg" alt=""/>
                <div className="flex justify-center">
                    <p className="text-3xl text-white font-bold">BUZOS</p>
                </div>
                </div>
            </div>

        <ArticleCarousel cat="remera" limit={4}/>
        
        <NewArrivalsComponent/>

        <ArticleCarousel cat="zapatillas" limit={4}/>

        </>
    )
}

export default Home
