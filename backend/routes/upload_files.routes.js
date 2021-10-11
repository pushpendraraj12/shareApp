const router=require('express').Router();
const multer=require('multer')
const {v4:uuidv4} = require('uuid')
const DIR='${__dirname}/../uploads/';
let File=require('../models/file.model')
const storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
})

let upload = multer({
    storage: storage,
    limit:{fileSize:1000000*50},
}).single('file');

router.route('/upload').post((req,res)=>{
    upload(req,res,async (error)=>{
    if(error){
    res.status(500).json(error.message)
}
        const file=new File({
            fileName:req.file.filename,
            uuid:uuidv4(),
            path:req.file.path,
            size:req.file.size
        })
        const response=await file.save();
        const sz=parseInt(file.size/1000) +'KB'
        const fname=file.filename
        const uuid=response.uuid
         const url = "http" + '://' + process.env.HOST+'/api/show/'+uuid;
         console.log(url)
        res.json({url,sz,fname,uuid})          
    })
})
router.route('/mail').post((req,res)=>{
    const {from,to,uuid}=req.body;
    console.log(uuid)
    if(!from||!to||!uuid){
        return res.json("All fields are required")
    }
    File.findOne({uuid:uuid})
    .then(suc=>{
        if(suc.from){
            return res.json("Mail sent already")
        }
        suc.from=from;
        suc.to=to;
        suc.save();
        const url = "http" + '://' + process.env.HOST+'/api/show/'+suc.uuid;
        const sendMail=require('../Mail_Service/mail_setup')
        sendMail({
            from,
            to,
            subject:"Download Link",
            text: parseInt(suc.size/1000) +'KB',
            link: url
        })
        res.json("Email sent successfully")

    })
    .catch(err=>{
        res.json("Somethong went wrong, Try again")
    })
})

module.exports=router