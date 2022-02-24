const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs')
const upload = multer({ dest: 'uploadedFiles/' });
const db = require('../module/db/sql/img_sql');
const { verifyToken } = require('../module/token/check');
const token = require('../module/token/token');

function GetFilePath(dir, target) {
    let stream;
    let path = require('path');
    const filePath = path.join(__dirname,'..', dir, target);
    const fileExist = fs.existsSync(filePath)
    if (fileExist){
        stream = fs.createReadStream(filePath);
    }
    return stream;
}

router.get('/upTask', verifyToken,  function (req,res){
    try {
        const uid = req.decryption.uid;
        const img = req.query.img;
        db.taskUpdate(uid, img, function (err, data){
            res.json({message:data});
        })
    }catch (e) { res.json({message:'error'}); }
})

router.get('/profileGet', function(req,res){
    try {
        const uid = token.decryption(req.query.token).uid
        db.pfGet(uid, function (err, data){
            const stream = GetFilePath('uploadedFiles', data[0].user_pf_img);
            if (stream){
                res.writeHead(200, {
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename=profile.jpg'
                });
                stream.pipe(res);
            }
            else res.render('fail');
        })
    }catch (e) { res.render('error')}
});

router.post('/profileUpload', verifyToken,upload.single('file'), function(req,res){
    const file_name = req.file.filename;
    db.pfUp(file_name, req.decryption.uid, function (err,data){
        res.render('confirmation', { file:req.file, files:null });
    });
});

router.get('/taskImgGet', function(req,res){
    try {
        const dir = req.query.dir
        const stream = GetFilePath('uploadedFiles', dir);
        if (stream){
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=profile.jpg'
            });
            stream.pipe(res);
        }
    }catch (e) { res.render('error')}
});

router.post('/resUpdate', upload.single('file'), function(req,res){
    const file_name = req.file.filename;
    db.rUpdate(file_name, req.query.task_no, function (err,data){
        res.send("success");
    });
});

router.get('/getTask', function (req,res){
    try {
        db.getTask(function (err, data){
            let r = [];
            let task;
            let len = data.length;
            for (let i=0;i<len;i++){
                task = {task_code:data[i].task_code, uimg:data[i].uimg, timg:data[i].timg};
                r.push({task:task});
            }
            res.json(r);
        })
    } catch (e) { res.render('error'); }
})

module.exports = router;
