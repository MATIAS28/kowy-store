const mongoose = require('mongoose');


const Product = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Introduce el nombre']
    },

    brand:{
        type: String,
        required: [true, 'Introduce el nombre de la marca']
    },

    price: {
        type: Number,
        required: [true, 'Introduce el precio']
    },

    weight: {
        type: Number,
        required: [true, 'Introduce el peso']
    },

    height: {
        type: Number,
        required: [true, 'Introduce el alto']
    },

    sizes: [{
        size:{
            type: String
        },
        quantity:{
            type: Number,
            default: 0
        }
    }],

    stock:[
        {
            color: {
                type: String
            },

            quantity: {
                type: Number
            }
        }
    ],

    category: {
        type: String,
        required: [true, 'Introduce la categoria']
    },

    description: {
        type: String,
        required: [true, 'Introduce una descripción']
    },

    imgs: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          }
        },
      ],

    views: {
        viewsCount:{
            type: Number,
            default: 0
        },

        date:{
            type: Date,
            default: Date.now
        }
    },

    createdAt:{
        type: Date,
        default: Date.now
    },

    available:{
        type: Boolean,
        default: true
    }
    
})

module.exports = mongoose.model('Product', Product);