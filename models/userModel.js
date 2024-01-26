const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"Please add the user name."],
        },
        email:{
            type:String,
            required:[true,"Please add the user Email address."],
            unique:[true,"Email address already taken."],
            lowercase:true,
        },
        password:{
            type:String,
            required:[true,"Please add the user password."],
            // minLength:[6,"password should containt atleast 6 charecters."],
            minLength:6,
        }
    },
    {
        timestamps:true,
    }
);
const userModel = mongoose.model("userModel",userSchema);
module.exports = userModel;