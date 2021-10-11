const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const hostname='127.0.0.1'
const app=express();
app.use(express.json());
// app.use(cookieParser())
const port=process.env.PORT || 8000;
app.use(cors({
 origin: ["http://localhost:5000", "http://localhost:3000"],
 methods: ["GET","POST"],
 credentials: true
}));
 app.use(function(req, res, next) {  
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      next();
 });  
app.use(cors());
const uri=process.env.DB_URI;

const file=require('../backend/routes/upload_files.routes')
app.use('/api/',file)
const show=require('./routes/download_show.routes')
app.use('/api/show/',show)
const download=require('./routes/download.routes')
app.use('/api/download',download)
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// app.use("*",(req,res) => res.status(404).json({error:"not-found"}));
app.listen(port,hostname,()=>{
    console.log(`Server running on port: ${port}`);
})