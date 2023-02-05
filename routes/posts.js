const express = require('express')
const verifyToken = require('../utils/verifyToken')
const { test, getAllPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/posts')

const router = express.Router()

router.get('/test', test)
router.get('/', verifyToken, getAllPosts)
router.get('/:id', verifyToken, getPost)
router.post('/', verifyToken, createPost)
router.put('/:id', verifyToken, updatePost)
router.delete('/:id', verifyToken, deletePost)

module.exports = router