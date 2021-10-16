const express = require('express');
const router = express.Router();

require('dotenv').config();

const db = require('../module/db/sql/user_sql');
const token = require('../module/token/token');
const { verifyToken } = require('../module/token/check');

router.get('/check', verifyToken, async (req, res) => {
    res.json({message: 'error'});
});

router.post('/sign', async (req, res) => {
    try{
        const id = req.body.id;
        const pw = req.body.pw;
        const email = req.body.email;
        db.crAccount(id,pw, email);
        res.json({message:"success"})
    }catch (e){
        res.json({message:"error",data:e})
    }
});

router.get('/refresh', verifyToken, async (req, res) => {
    let tk;
    try{
        if (process.env.test == "true") tk = req.query.token;
        else tk = req.headers.authorization;
        if (tk!=undefined){
            db.rfcheck(tk,function (err,data){
                if(data[0].res!=0){
                    const uid = token.decryption(tk).uid;
                    res.json({message:"success", accessToken: token.mktoken(uid, process.env.accessToken)});
                }else
                {
                    res.json({message:"error", accessToken: 'InvalidToken'});
                }
            });
        }else{
            res.json({message:"error", accessToken: 'NoToken'});
        }
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
    if (process.env.test == "true"){
        try{
            const id = req.query.id;
            const pw = req.query.pw;
            login(id,pw, res);
        }catch (e){
            res.json({message:"error",data:e})
        }
    }
    else{
        res.json({message:"cannot use this api get method"});
    }
});

router.post('/login', async (req, res) => {
    try{
        const id = req.body.id;
        const pw = req.body.pw;
        login(id,pw, res);
    }catch (e){
        res.json({message:"error",data:e})
    }
});

module.exports = router;
