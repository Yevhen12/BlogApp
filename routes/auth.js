const express = require('express')
const {test, signup, signin} = require('../controllers/auth')

const router = express.Router()

router.get('/test', test)
router.post('/signup', signup)
router.post('/signin', signin)

module.exports=router