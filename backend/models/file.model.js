const mongoose=require('mongoose')
const schema=mongoose.Schema;
let fileSchema=new schema({
    fileName:{type:String,required:true},
    size:{type:Number,required:true},
    path:{type:String,required:true},
    uuid:{type:String,required:true},
    from:{type:String},
    to:{type:String}
},{timestamps:true})
const File=mongoose.model('File',fileSchema);
module.exports=File;