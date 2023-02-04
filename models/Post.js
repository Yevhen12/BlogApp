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
        lastName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Post', PostSchema)