const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) =>{
    try {
        req.decode = jwt.verify(req.headers.authorization, process.env.key);
        return next();
    }
    catch (error){
        if(error.name === 'TokenExpiredError') {
            return res.status(419).json({
                code:419,
                message:'Token Expiration'
            });
        }
        return res.status(401).json({
            code:401,
            message: 'Invalid token'
        });
    }
}
