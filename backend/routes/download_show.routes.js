const router=require('express').Router();
let File=require('../models/file.model')
router.route('/:uuid').get((req,res)=>{
    File.findOne({uuid:req.params.uuid})
    .then(suc=>{
        var name=suc.fileName;
        var size=suc.size/1000;
        var uuid=suc.uuid;
        var dlink=req.protocol+'://'+req.get('host')+'/api/download/'+uuid;
        res.status(200).json([name,size,dlink,uuid]);
    })
    .catch(err=>{
        res.json({error:err})
    })
})

module.exports=router;