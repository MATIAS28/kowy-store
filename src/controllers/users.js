const User = require('../models/user');
const jwt = require('../services/jwt');
const bcrypt = require('bcrypt');
const salts = 10;

//registro
function signin (req, res){
    const params  = req.body;
    const user = new User();

User.findOne({email: params.email}, (err, results) => {
    if(err) return res.status(500).send({message: 'Error al registrar el usuario'})

    if(results){
        return res.status(500).send({message: 'El usuario ya existe'});

    }else if(params.name && params.surname && params.email && params.password ){
        user.name = params.name;
        user.email = params.email;
        user.surname = params.surname;
        //user.phone_number = params.phone_number; user.doc = params.doc;
        
        
        bcrypt.hash(params.password, salts, (err, hash) => {
            
            if(err) return res.status(500).send({message: 'error al registrar el usuario'})
            user.password = hash;

            user.save((err, userSaved) => {
                if(err) return res.status(500).send({message: 'error al registrar el usuario'})

                if(userSaved){
                    return res.status(200).send({message: 'Usuario guardado con exito'})
                }
            })

        })
    }else{
        return res.status(200).send({message: 'Todos los campos son obligatorios'});
    }
});

}


//login
function login(req, res){
    const params = req.body;
    email = params.email;
    password = params.password;

    User.findOne({email: email}, (err, user) => {

        if(err != null){
            return res.status(500).send({message: 'Error al iniciar session'});
        }

        if(!user){
            return res.status(500).send({message: 'usuario no encontrado'});
        }

        if(err === null && user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) return res.status(500).send({message: 'Erro al iniciar sesion'});
                if(result){
                    return res.status(200).send({token: jwt.createToken(user)});
                }else{
                    return res.status(500).send({message: 'Error al iniciar session'});
                }
            });
        }
    })
}

//Devolver usuario
function getUser(req, res){

    User.findById(req.user.sub, (err, user) => {
        if(err) return res.status(500).send({message: 'Error al devolver el usuario'})

        if(!user) return res.status(500).send({message: 'Usuario no encontrado'})

        return res.status(200).send({user: user})
    })
}


//Actualizar usuario
function updateUser(req, res, next){
    const userId = req.user.sub;
    let {...update} = req.body
    
    try {
        if(update.password) return res.status(500).send('dato no aceptado')
        
        User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actulizar los datos del usuario'})
            
            if(!userUpdated) return res.status(500).send({message: 'Usuario no encontrado'})
            
            if(update.pass && update.newPassword){
                next()
            }else{
                return res.status(201).send({user: userUpdated})
            }
        })
    } catch (e) {
        return res.send(e)
    }
}

function updatePassword (req, res) {

    User.findById(req.user.sub, (err, user) => {
        if(err) return res.status(500).send({message: 'Error al encontrar usuario'})
        if(!user) return res.status(500).send({message: 'Usuario no encontrado'})

        bcrypt.compare(req.body.pass, user.password, (err, result) => {
            if(!result) return res.status(404).send({message: 'Accion denegada'})
            if(err) return res.status(500).send({message: 'Error al actualizar usuario'})

             bcrypt.hash(req.body.newPassword, salts, (err, hash) => {
                if(err) return res.status(500).send({message: 'Error al actualizar usuario'})
                if(!hash) return res.status(404).send({message: 'Error al actualizar usuario'})
             User.findByIdAndUpdate(req.user.sub, {password: hash}, {new: true}, (e, userUpdated) => {
                if(e) return res.status(500).send({message: 'Error al actualizar usuario'})
                if(!userUpdated) return res.status(404).send({message: 'No fue posible actualizar el usuario'})

                return res.status(200).send({user: userUpdated})
             })
            })

        })  
    })
}

//Agregar direcciòn 
async function addAddress(req, res){
    const {...address} = req.body 

    if(address.phone_number && address.name 
        && address.address 
        && address.neighborhood && address.streets 
        && address.province && address.locality 
        && address.post_code){  
        return res.status(404).send({message: 'Todos los datos son obligatorios'})
        }
    
    try {
        const adressSaved = await User.findByIdAndUpdate(req.user.sub, { $push: {addresses: address} })
        return res.status(201).send({address: adressSaved})
    } catch (e) {
        return res.status(404).send({message: 'Todos los datos son obligatorios'})
    }
    
}

module.exports = {
    signin,
    login,
    getUser,
    updateUser,
    updatePassword,
    addAddress
}