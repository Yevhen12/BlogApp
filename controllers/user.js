const UserModel = require('../models/User')
const bcrypt = require('bcrypt')

const test = (req, res) => {
    res.json('Niiiiice')
    //console.log("Nice work")
}

const getUser = async (req, res) => {
    if (req.userId === req.params.id) {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'Can not get info'
            })
        }

        const { password, ...others } = user._doc
        res.json(others)
    } else {
        res.status(404).json({
            status: 404,
            message: 'Sorry, user can not be found'
        })
    }

}

const updateUserInfo = async (req, res) => {
    if (req.userId === req.params.id) {
        const user = await UserModel.findByIdAndUpdate(req.userId, {
            $set: req.body
        }, { new: true })

        if (!user) {
            res.status(500).json({
                status: 500,
                message: 'You dont have access to this page!'
            })
        }

        const { password, ...others } = user._doc
        res.json(others)
    } else {
        res.status(404).json({
            status: 404,
            message: "Sorry, you don't have access to this page"
        })
    }
}

const changePassword = async (req, res) => {
    if (req.userId === req.params.id) {
        const currentUser = await UserModel.findById(req.userId)
        const isOldPasswordCorrect = await bcrypt.compare(req.body.oldPassword, currentUser.password)
        if (!isOldPasswordCorrect) {
            res.status(400).json({
                status: 400,
                message: "It's not your old password"
            })
        }

        if (req.body.newPassword !== req.body.confirmedPassword) {
            res.status(400).json({
                status: 404,
                message: "Passwords don't match"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.newPassword, salt);


        const user = await UserModel.findByIdAndUpdate(req.userId, {
            password: hash
        }, { new: true })

        console.log('useruser', user)

    const { password, ...others } = user._doc
    res.json(others)


    console.log(req.userId)
} else {
    res.status(404).json({
        status: 404,
        message: "Sorry, you don't have access to this page"
    })
    }
res.json('change password')
}

const deleteUser = async (req, res) => {
    if (req.userId === req.params.id) {
        await UserModel.findByIdAndDelete(req.userId)

        res.status(200).json({
            success: true,
            message: 'User has been deleted'
        })
    } else {
        res.status(404).json({
            status: 404,
            message: "Sorry, you don't have access to this page"
        })
    }
}

const savePost = async (req, res) => {
    res.json('save post')
}

module.exports = { test, updateUserInfo, changePassword, getUser, deleteUser, savePost }