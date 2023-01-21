const bcrypt = require('bcrypt');
const UserModel = require('../models/User')

const test = (req, res) => {
    res.json('Niiiiice1')
    //console.log("Nice work")
}

const signup = async (req, res) => {
    try {
        const { username, firstName, lastName, password } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const doc = new UserModel({
            username,
            firstName,
            lastName,
            password: hash,
        })

        const user = await doc.save()

        res.json({
            user
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Could not create a user. Please try again"
        })
        console.log(err)
    }
}

module.exports = { test, signup }