const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type:String,
        required:true,
    },
    email : {
        type:String,
        required:true,
        unique:true,
    },
    password : {
        type:String,
        required:true,
        minlength:6,
    }
})
module.exports = mongoose.model("User",userSchema);
// According to naming convention is mongodb it will store it in "users"
//As it lowercase (first letter) and make it a plural form
