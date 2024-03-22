import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/solid"
import toast, { Toaster } from 'react-hot-toast';
import { deleteProduct, saveProduct, updateProduct, updateStatus } from "@/services/productsService"
import { useRouter } from "next/navigation";


export const ProductHandlerButton = ({setProduct, product, imgs, setImgs, imgsDeleted, setImgsDeleted}) => {
    const {push} = useRouter()


    const handlerSaveProduct = async () => {
        toast.dismiss()
        toast.loading('Guardando...');
        const inputs = document.querySelectorAll('input')
        
        inputs.forEach((input) => {
            input.disabled = true;
        });

        try {
            const productSaved = await saveProduct(product, imgs)
            setProduct(productSaved)
            setImgs([])

            toast.dismiss();
            inputs.forEach((input) => {
            input.disabled = false;
            });

            toast.success('El producto se ha guardado correctamente');
        } catch (e) {
            toast.dismiss();
            inputs.forEach((input) => {
                input.disabled = false;
            });
            toast.error('Hubo un error al guardar el producto:'+e);
            console.log(e);
        }
    }

    const handlerUpdateProduct = async () => {
        toast.dismiss()
        toast.loading('Guardando...');

        const inputs = document.querySelectorAll('input')
        inputs.forEach((input) => {
            input.disabled = true;
        });

        try {
            const productUpdated = await updateProduct(product, imgs, imgsDeleted)
            setProduct(productUpdated)
            setImgs([])
            setImgsDeleted([])
            
            toast.dismiss();
            inputs.forEach((input) => {
            input.disabled = false;
            });

            toast.success('El producto se ha guardado correctamente');
        } catch (e) {
            toast.dismiss();
            inputs.forEach((input) => {
                input.disabled = false;
            });
            toast.error('Hubo un error al guardar el producto:'+e);
            console.log(e);
        }
    }

    const handlerUpdate = () => {
        toast((t) => (
            <div className="w-fit">
                <span className="font-light">
                ¿Estas seguro de actualizar el producto?
                </span>

                <button className="text-sm font-semibold rounded-xl mx-3"
                 onClick={handlerUpdateProduct}>
                    Si
                </button>

                <button className="text-sm font-semibold rounded-xl" 
                onClick={() => toast.dismiss()}>
                    No
                </button>
            </div>
          ));
    }

    const handlerCreate = () => {
        toast((t) => (
            <div className="w-fit">
                <p className="font-light">
                ¿Estas seguro de crear el producto?
                </p>

                <button className="text-sm font-semibold rounded-xl mx-3"
                 onClick={handlerSaveProduct}>
                    Si
                </button>

                <button className="text-sm font-semibold rounded-xl" 
                onClick={() => toast.dismiss()}>
                    No
                </button>
            </div>
          ));
    }

    const handlerDeleteProduct = () => {
        toast((t) => (
            <div className="flex items-center w-full h-12">
                <p className="text-base py-2 w-full">
                ¿Estas seguro de eliminar el producto?
                </p>

                <button className="text-white bg-red-800 font-bold rounded-md mr-3 p-2"
                 onClick={DeleteProduct}>
                    Si
                </button>

                <button className="text-white bg-black font-bold rounded-md p-2" 
                onClick={() => toast.dismiss()}>
                    No
                </button>
            </div>
          ));
    }

    const handlerUpdateStatus = async () => {
        toast.loading('Actualizando...');
        try {
            const statusUpdated = await updateStatus(product._id, product.available)
            setProduct(statusUpdated)
            toast.dismiss()
            toast.success('Estado actualizado');
        } catch (e) { 
            toast.dismiss()
            toast.error('Hubo un error al actualizar el producto:'+e);
            console.error(e);
        }
    }

    const DeleteProduct = async () => {
        toast.dismiss()
        toast.loading('Eliminando...');
        try {
            const productDeleted =  await deleteProduct(product._id)

            toast.dismiss()
            toast.success(productDeleted);

            setTimeout(() => {
                push('/products')
                toast.dismiss()
            }, 2000)
        } catch (e) {
            toast.dismiss()
            toast.error('Hubo un error al actualizar el producto:'+e);
            console.error(e);
        }
    }


    return(
        <div className="flex items-center">
            { product && product._id  ? 
            <button onClick={handlerUpdate} className="flex justify-center items-center bg-black p-2 rounded-md">
            <CloudArrowUpIcon className="w-5 h-5 mr-2 fill-white"/>
            <span className="text-base font-semibold text-white">Actualizar</span>
            </button>
            :
            <button onClick={handlerCreate} className="flex justify-center items-center primary p-2 rounded-md">
            <CloudArrowUpIcon className="w-5 h-5 mr-2"/>
            <span className="text-base font-semibold">Publicar</span>
            </button>
            }

            {product && product._id  &&
                <div className="flex items-center">
                <button onClick={handlerUpdateStatus} className={`flex justify-center items-center p-2 mx-2 rounded-md ${product && product.available  ? "primary" : "bg-black text-white"}`}>
                <span className="text-base font-semibold">{product && product.available  ? "Disponible":"No disponible"}</span>
                </button>
                
                <button onClick={handlerDeleteProduct} className="p-2 rounded-md">
                    <TrashIcon className="w-6 h-6 hover:fill-red-700"/>
                </button>
                </div>
            }
        </div>
    )
}