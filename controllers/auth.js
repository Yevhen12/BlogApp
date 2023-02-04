const bcrypt = require('bcrypt');
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('Niiiiice1')
    //console.log("Nice work")
}

const signup = async (req, res) => {
    try {
        const { username, firstName, lastName } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const doc = new UserModel({
            username,
            firstName,
            lastName,
            password: hash,
        })

        const user = await doc.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_KEY)
        const {password, ...others} = user._doc
 
        res.json({...others, token})
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Could not create a user. Please try again"
        })
        console.log(err)
    }
}

const signin = async (req, res) => {
    try {
        console.log(req.body.username)
        const user = await UserModel.findOne({ username: req.body.username })
        console.log('new user', user)

        if (!user) {
            return req.status(404).json({
                status: 404,
                message: 'Inccorect data'
            })
        }

        const isCorrect = await bcrypt.compare(req.body.password, user.password)

        if(!isCorrect) {
            return req.status(404).json({
                status: 404,
                message: 'Inccorect password'
            })        }

        const token = jwt.sign({id: user._id}, process.env.JWT_KEY)
        const {password, ...others} = user._doc
 
        res.json({...others, token})
    } catch (err) {
        console.log('err', err.status)
        res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.message || "Something went wrong during sign in"
        })
    }
}

module.exports = { test, signup, signin }