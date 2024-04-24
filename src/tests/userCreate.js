const User = require('../models/User')

const userCreate = async () =>{
    const user = {
        firstName: 'Yoneison',
        lastName: 'Bayona',
        email: 'yoneison@gmail.com',
        password: 'yoneison1234',
        phone: '1234453'
    }

    await User.create(user)
}




module.exports = userCreate;