const mongoose = require('mongoose');

const Order = mongoose.Schema({

    shippingInfo:{

        phone_number: {
            type: Number,
            required: [true, 'El numero de telefono es obligatorio']
        },

        name: {
            type: String
        },

        adress:{
            type: String,
            required: true
        },

        neighborhood:{
            type: String,
            required: true 
        },

        streets:{
            type: String,
            required: true
        },

        province:{
            type: String,
            required: true
        },

        locality:{
            type: String,
            required: true
        },

        post_code:{
            type: String,
            required: true
        }
    },

    products:[
        {
            id:{
                type: String,
                required: [true, 'El id es obligartorio']
            },

            category: {
                type: String,
                required: [true, 'La categoria es obligatoria']
            },

            description:{
                type: String,
                required: [true, 'La descripcion es obligatoria']
            },

            color:{
                type: String,
                required: [true, 'El color es obligatorio']
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

    paid: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('Order', Order)