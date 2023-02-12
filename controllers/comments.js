const CommentModel = require('../models/Comment')

const test = (req, res) => {
    res.json('Niiiiice2')
    //console.log("Nice work")
}

const addComment = async (req, res) => {
    try {
        const userId = req.userId
        const postId = req.params.id

        const doc = new CommentModel({
            text: req.body.text,
            user: userId,
            post: postId
        })

        const newComment = await doc.save()

        res.json(newComment)
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Unknown error, try again later!"
        })
    }
}

const getAllComments = async (req, res) => {
    try {
        const postId = req.params.id

        const listComments = await CommentModel.find({post: postId})

        res.json(listComments)

    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Unknown error, try again later!"
        })
    }
}



module.exports = { test, addComment, getAllComments }