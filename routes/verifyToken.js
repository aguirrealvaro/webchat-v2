const jwt = require('jsonwebtoken')

const auth = async (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access denied')
    try{
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch(err){
        res.status(400).send('Invalid token')
    }
}

module.exports = auth