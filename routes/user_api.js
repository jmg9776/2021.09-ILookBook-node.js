const express = require('express');
const router = express.Router();
require('dotenv').config();

const db = require('../module/db/user_api');

const token = require('../module/token/token');
const { verifyToken } = require('../module/token/check');
module.exports = router;

router.get('/refresh', verifyToken, async (req, res) => {
    let tk;
    try{
        if (process.env.develop == "true") tk = req.query.token;
        else tk = req.headers.authorization;
        db.rfcheck(tk,function (err,data){
            if(data[0].res!=0){
                const uid = token.decryption(tk).uid;
                res.json({message:"success", accessToken: token.mktoken(uid, process.env.accessToken)});
            }else
            {
                res.json({message:"error", accessToken: 'InvalidToken'});
            }
        });
    }catch (e){
        res.json({message:"error",data:e});
    }
});

function login(id, pw, res){
    let uid;

    if (id != undefined && pw != undefined
        && id != null && pw != null){
        db.loginCheck(id,pw,function (err,data) {
            try{
                uid = data[0].user_code;
            }catch(e){}
            if (uid!=undefined){
                const tk = token.lgToken(uid);
                db.logtokenInsert(tk.refreshToken,function (err,data){
                    res.json({message:"success",accessToken:tk.accessToken, refreshToken:tk.refreshToken});
                });
            }
            else{
                res.json({message: 'fail'});
            }
        });
    }
    else{
        res.json({message:"NoParameter"});
    }
}
router.get('/login', async (req, res) => {
    if (process.env.develop == "true"){
        try{
            const id = req.query.id;
            const pw = req.query.pw;
            login(id,pw, res);
        }catch (e){
            res.json({message:"error",data:e})
        }
    }
    res.json({message:"cannot use this api get method"});
});
