const express = require('express')
const verifyToken = require('../utils/verifyToken')
const { test, getAllComments, addComment } = require('../controllers/comments')

const router = express.Router()

router.get('/test', test)
router.post('/:id', verifyToken, addComment)
router.get('/:id', verifyToken, getAllComments)

module.exports = router