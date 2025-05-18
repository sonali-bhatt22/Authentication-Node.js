 const jwt = require('jsonwebtoken')
 const checkAuthenticated = (req, res, next)=>{


    const token = req.headers['authorization']
    if(!token){
        return res.json({
            message: 'Unauthorized, JWT token is required'

        })

    }
    try {
        const decodeData = jwt.verify(token, process.env.JWT_SECRET)
        if(decodeData){
            req.user = decodeData
            next()
        }
    } catch (error) {
        return res.status(403).json({
            message: {error}
        })
    }

}
module.exports = checkAuthenticated