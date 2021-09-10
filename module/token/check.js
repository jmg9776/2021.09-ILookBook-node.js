const check = require('jsonwebtoken');
require('dotenv').config();

//토큰 유효성 검사
exports.verifyToken = (req,res,next) =>{
    if (process.env.develop=="true") return next();
    try {
        req.decryption = check.verify(req.headers.authorization, process.env.key);
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
