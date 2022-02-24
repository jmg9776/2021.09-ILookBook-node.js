const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const upload = multer({ dest: 'uploadedFiles/' })
const { verifyToken } = require('../module/token/check')
const token = require('../module/token/token');
const db = require('../module/db/sql/board_sql');

router.post('/mdUpload', upload.single('file'), function(req,res){
    const file_name = req.file.filename
    db.mdUp(req.body.name, req.body.price, file_name, req.body.text, "10000", req.body.like)
})

router.get('/mdGet', function(req,res){
    const id = req.query.id
    try {
        db.mdGet(id, function (err, data){
            if (data[0]!=undefined){
                res.json({code:id, name:data[0].md_name,
                    price:data[0].md_price, img:data[0].md_img, text:data[0].md_text, stock:data[0].md_stock, like:data[0].md_like})
            }
            else res.json({message:"error"})
        })
    }catch (e){}
})

router.get('/mdListGet', function(req,res){
    const id = req.query.id
    let r = [];
    try {
        db.mdListGet(function (err, data){
            if (data[0]!=undefined){
                for (let i=0; i<data.length; i++){
                    r.push({
                        code:data[i].md_code,
                        name:data[i].md_name,
                        img:data[i].md_img,
                        price:data[0].md_price
                    })
                }
                res.json({list:r})
            }
            else res.json({message:"error"})
        })
    }catch (e){}
})

module.exports = router
