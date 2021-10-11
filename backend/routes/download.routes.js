const router=require('express').Router();
let File=require('../models/file.model')
router.route('/:uuid').get((req,res)=>{
    File.findOne({uuid:req.params.uuid})
    .then(suc=>{
        const path=`${__dirname}/../${suc.path}`
        res.download(path)
    })
    .catch(err=>{
        res.json("Link is expired")        
    })
})
module.exports=router;