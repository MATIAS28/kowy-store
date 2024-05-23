const mongoose = require('mongoose')


const Admin = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String, 
        required: [true, 'El corre es obligatorio'],
        minLength: [5, 'El correo debe contener mas de 5 caracteres'],
        match: [/.+\@.+\..+/, 'Correo  no valido']
    },

    password: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minLength: [8, 'La contraseña debe contener 8 o mas caracteres']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Admin', Admin)