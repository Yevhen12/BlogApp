const express = require('express')
const verifyToken = require('../utils/verifyToken')

const { test, changePassword, updateUserInfo, getUser, deleteUser, savePost } = require('../controllers/user')

const router = express.Router()

router.get('/test', test)
router.put('/:id', verifyToken, updateUserInfo)
router.put('/changePassword/:id', verifyToken, changePassword)
router.put('/:postId', savePost)
router.delete('/:id', verifyToken, deleteUser)
router.get('/:id', verifyToken, getUser)



module.exports = router