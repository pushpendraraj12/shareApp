const nodemailer=require("nodemailer")
const hbs=require('nodemailer-express-handlebars')
function sendMail({from,to,subject,text,link}){
    let transporter=nodemailer.createTransport({
        host:process.env.SERVICE,
        port:process.env.EPORT,
        secure:false,
        auth: {
            user:process.env.EID,
            pass:process.env.EPASS
        }
    })
    const options = {
  viewEngine: {
    partialsDir: "./views/partials",
    layoutsDir: "./views/layouts",
    extname: ".hbs"
  },
  extName: ".hbs",
  viewPath: "./views"
};   
transporter.use('compile',hbs(options)); 
let mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: text,
      template: 'mail',
      context:{
          link:link
      },    
    };  
        transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
           res.status(500).json('server problem');
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    })
}
module.exports=sendMail;