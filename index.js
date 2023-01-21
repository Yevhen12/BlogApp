const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('./constants/jwtKey')
const { MONGO_DB_URL } = require('./constants/mongoURL')
const mongoose = require('mongoose')
const UserModel = require('./models/User')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')

const app = express()

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log('Connected'))
    .catch((err) => console.log('Database error ', err))

app.use(express.json())

app.get('/', (req, res) => {
    console.log(req.body)
    res.send('Hello world')
})
app.post('/', (req, res) => {
    const { username, firstName, lastName, password } = req.body
    console.log(JWT_KEY)
    const token = jwt.sign(
        {
            email,
            password,
        },
        process.env.JWT_KEY
    )
    res.json({
        password: "2121212",
        email: "dasdsdda@gmail.com",
        token
    })
    //res.send('Hello world')
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

app.post('/auth/register', async (req, res) => {
    try{
        const { username, firstName, lastName, password } = req.body
        const doc = new UserModel({
            username,
            firstName,
            lastName,
            password,
        })
    
        const user = await doc.save()
    
        res.json({
            user
        })
    } catch(err) {
        res.status(500).json({
            message: "Could not create a user. Please try again"
        })
        console.log(err)
    }
   
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log('some error')
    }
    console.log(process.env)
})

console.log(11)