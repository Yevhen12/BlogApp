const test = (req, res) => {
    res.json('Niiiiic3')
}

const createPost = async (req, res) => {
    res.json('create post')
}

const getPost = async (req, res) => {
    res.json('getPost')
}

const getAllPosts = async (req, res) => {
    res.json('getAllPost')
}

const updatePost = async (req, res) => {
    res.json('updatePost')
}

const deletePost = async (req, res) => {
    res.json('deletePost')
}

module.exports = { test, createPost, getAllPosts, getPost, updatePost, deletePost }