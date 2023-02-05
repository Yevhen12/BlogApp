const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true
        },
        comments: {
            type: Array,
            default: []
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Post', PostSchema)