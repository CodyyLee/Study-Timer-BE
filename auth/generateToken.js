const jwt = require('jsonwebtoken');

module.exports = user => {
    const payload = {
        id: user.id,
        username: user.username
    }

    const secret = process.env.SECRET
    console.log(secret)

    const options = {
        expiresIn: '2h'
    }

    return jwt.sign(payload, secret, options)
}