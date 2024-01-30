import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"

const Carousel = () => {
    const [index, setIndex] = useState(0)
    const banner_imgs = ['https://c.static-nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/tpqid8vgfey6m4ke86te/123-joyride-cdp-apla-xa-xp.jpg', 'https://i.pinimg.com/originals/9c/9f/0c/9c9f0c5221ef90c7d05ba151671bf482.png', 'https://media.revistagq.com/photos/618105ccd5e3f1d271a23f9a/16:9/w_1280,c_limit/NewBalancexCasablanca-Feature-August232021-08-22-2021-4_415c6772-238f-43bf-a015-be7bde58f167_1200x.jpg']
    
    const carouselInfiniteScroll = () => {
        if (index == banner_imgs.length-1) {
            return setIndex(0)
        }else{
            return setIndex(index+1)
        }
    }

    useEffect(() => {
        const timer = setInterval(carouselInfiniteScroll, 15000);

        return () => clearInterval(timer)
    })

    return(
                <div id="img" style={{backgroundImage: 'url('+banner_imgs[index]+')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="flex justify-between items-center w-full mb-10 h-[30rem] p-3">
                <ChevronLeftIcon className="h-12 w-12 cursor-pointer" onClick={() => setIndex(prev => prev > 0 ? prev-1 : 0)} fill="white"/>
                <ChevronRightIcon className="h-12 w-12 cursor-pointer" onClick={() => setIndex(prev => prev == banner_imgs.length-1 ? 0 : prev+1)} fill="white"/>
                <style jsx="true">
                {`
                    @media(max-width: 768px){
                        #img{
                            height: 12rem;
                            padding: 0.5rem;
                        }
                    }
                `}
                </style>
                </div>
    )
}

export default Carousel