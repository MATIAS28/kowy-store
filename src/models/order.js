const mongoose = require('mongoose');

const Order = mongoose.Schema({

    shippingInfo:{

        address:{
            type: String,
            required: [true, 'La direccion es obligatoria']
        },

        dni:{
            type: String,
            required: [true, 'El DNI es obligatorio']
        },
        
        locality: {
            type: String,
            required: [true, 'La Localidad es obligatoria']
        },
        
        name: {
            type: String,
            required: [true, 'EL nombre es obligatorio']
        },

        surname: {
            type: String,
            required: [true, 'El apellido es obligatorio']
        },

        neighborhood: {
            type: String,
            required: [true, 'El barrio es obligatorio']
        },
        
        phone_number: {
            type: String,
            required: [true, 'El numero de telefono es obligatorio']
        },
        
        post_code: {
            type: String,
            required: [true, 'El codigo postal es obligatorio']
        },

        province: {
            type: String,
            required: [true, 'La provincia es obligatoria']
        }
    },

    products:[
        {
            _id:{
                type: String,
                required: [true, 'El id es obligartorio']
            },

            name: {
                type: String,
                required: [true, "El name es obligartorio"]
            },

            brand: {
                type: String,
                required: [true, "La marca es obligartorio"]
            },

            img: {
                type: String,
                required: [true, 'La imagen es es obligatoria']
            },

            description:{
                type: String,
                required: [true, 'La descripcion es obligatoria']
            },

            size:{
                type: String,
                required: [true, 'El talle es obligatorio']
            },

            quantity:{
                type: Number,
                required: [true, 'Introduce la cantidad']
            },

            unit_price: {
                type: Number,
                required: [true, 'El precio es obligatorio']
            }
        }
    ],

    productsPrice:{
        type: Number,
        required: true,
        default: 0
    },

    shippingPrice:{
        type: Number,
        default: 0
    },

    totalPrice:{
        type: Number,
        required: true
    },

    user:{ 
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
     },

    createdAt: {
        type: Date,
        default: Date.now
    },

    delivered:{
        type: Boolean,
        default: false
    },

    paymentInfo: {
        id: {
            type: Number,
            default: null
        },

        date: {
            type: String,
            default: null
        },
        
        paid: {
            type: Boolean,
            default: false
        }
    }
})


module.exports = mongoose.model('Order', Order)