const jwt = require('jsonwebtoken');

//토큰 유효성 검사
exports.verifyToken = (req,res,next) =>{
    try {
        req.decode = jwt.verify(req.headers.authorization, process.env.key);
        return next();
    }
    catch (error){
        if(error.name === 'TokenExpiredError') {
            return res.json({
                message:'TokenExpiration'
            });
        }
        return res.json({
            message: 'InvalidToken'
        });
    }
}
