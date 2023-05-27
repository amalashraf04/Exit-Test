const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app =express();
const nodemailer = require('nodemailer');
const user=require('../backend/model/user')


app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const mongoose = require('./db')
// const api = require('./routes/api')
// app.use('/api',api)


app.post('/api/email',async(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Method:GET,POST,PUT,DELETE")
    const randomPin = Math.floor(1000 + Math.random() * 9000);
    var data ={
     email : req.body.email,
     otp:randomPin
    }
    var authdb = new user(data)
    authdb.save().then((data)=>{
   
     var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'amalashraf04@gmail.com',
          pass: 'xwyqvkduyyedqfzj'
      }
   });
   
   var mailOptions = {
      from: 'amalashraf04@gmail.com',
      to: data.email,
      subject: 'OTP',
      text: `Your OTP is: ${data.otp}`
   
   };

   transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    } else {
        console.log('Email sent successfully'+info.response);
    }
 });
   
   console.log(data)
  res.send(data)
  }
   )
 
 })
 
 app.post('/api/otp',(req,res)=>{
   var data = {
     email:req.body.email,
     otp:req.body.otp
 }
 user.findOne({email:data.email,otp:data.otp}).then((data)=>{
  if (data != null ){
   console.log("otp",data)
   res.send(data)
  }
  else{
 res.send(null)
  }
  
 })
 })


//hosting

const path = require('path');
app.use(express.static('./dist/frontend/'))
app.get('/*', function(req, res) { res.sendFile(path.join(__dirname + '/dist/frontend/index.html')); });


app.listen(2341,()=>{
    console.log("server running at 2341")
})