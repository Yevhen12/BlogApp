const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    // if(req.params.id === )
    console.log("req.headers", req.headers)
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    console.log('token', token)
    if(token) {
        try{
            const decodedUserId = jwt.decode(token, process.env.JWT_KEY)

            req.userId = decodedUserId.id
            console.log('userId', decodedUserId)
            next()
        } catch(err) {
            res.status(403).json({
                staus: 403,
                message: "Error in decoding token"
            })
        }
    }
}

module.exports = verifyToken