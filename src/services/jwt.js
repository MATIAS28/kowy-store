const jwt = require('jsonwebtoken');
const moment = require('moment');
const key = process.env.USER_KEY;
const adminKey = process.env.ADMIN_KEY;

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.sign(payload, key);
}

exports.createAdminToken = (admin) => {
    const payload = {
        sub: admin._id,
        name: admin.name,
        email: admin.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.sign(payload, adminKey)
}