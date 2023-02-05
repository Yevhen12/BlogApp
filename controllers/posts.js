const PostModel = require('../models/Post')

const test = (req, res) => {
    res.json('Niiiiic3')
}

const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        if (!title || !text) {
            res.status(400).json({
                status: 400,
                message: "Please make sure you fill all fields and try again!"
            })
        }
        const doc = new PostModel({
            title,
            text,
            comments: [],
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)

    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Unknown error, try again later!"
        })
    }
}

const getPost = async (req, res) => {
    try {
        const postId = req.params.id
        console.log('postId', postId)
        const post = await PostModel.findById(postId)

        if (!post) {
            return res.status(404).json({
                status: 404,
                message: "Sorry, could not find this post"
            })
        }

        res.send(post)
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Can't get post. Please try again!"
        })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()

        res.json(posts)
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Can't get posts. Please try again!"
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id

        const updatedPost = await PostModel.findByIdAndUpdate(postId, {
            $set: req.body
        }, { new: true })

        if(!updatedPost) {
            res.status(404).json({
                status: 404,
                message: "Could not find post"
            })
        }

        res.json(updatedPost)
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Can't update post"
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndDelete({
            _id: postId
        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: "Sorry, can't delete post"
                })
            }

            if (!doc) {
                return res.status(500).json({
                    status: 500,
                    message: "Your post is empty"
                })
            }

            res.json({
                success: true
            })
        })

    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Can't delete post!"
        })
    }
}

module.exports = { test, createPost, getAllPosts, getPost, updatePost, deletePost }