const express = require('express')
const {test, signup} = require('../controllers/auth')

const router = express.Router()

router.get('/test', test)
router.post('/signup', signup)

module.exports=router