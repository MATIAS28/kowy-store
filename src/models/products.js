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

    sizes: [{
        size:{
            type: String
        },
        quantity:{
            type: Number,
            default: 0
        }
    }],

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
    },

    discount: {
        type: Number,
        default: 0
    }
    
})

module.exports = mongoose.model('Product', Product);