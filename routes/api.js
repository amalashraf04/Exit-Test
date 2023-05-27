const express = require('express')
const userData=require('../model/user')
const nodeMailer = require("nodemailer");



var router = express.Router();


function generate_otp(length) {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}
let transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
   user: 'amalashraf04@gmail.com',
   pass: 'xwyqvkduyyedqfzj'
  } 
 });
router.post('/submit',async(req,res)=>{
  const{email} = req.body;
  // Generate OTP
  const otp = generate_otp(6);

  

    const message ={
      from: 'amalashraf04@gmail.com', 
       to: `${email}`, 
      
      subject: "node-mailer-assignment", 
      text: `Your OTP is: ${otp}`, 
    }
  
    let info = await transporter.sendMail(message);
  
    console.log("Message sent: %s", info.messageId);

     res.send("Email sent successfully !");
})




router.get('/',async(_req,res)=>{
 
    try {
        
    let users =  await userData.find()
    res.send(users);


    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }

})
module.exports= router