const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type: String,
    
    },
    email :{
        type: String,
        required : true
    },
    otp :{
        type: String,
       
    }
});

const userInfo = mongoose.model('user', userSchema);
module.exports = userInfo;