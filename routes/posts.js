const express = require('express')
const { test, getAllPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/posts')

const router = express.Router()

router.get('/test', test)
router.get('/', getAllPosts)
router.get('/:id', getPost)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router