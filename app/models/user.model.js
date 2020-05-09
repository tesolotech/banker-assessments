const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mobile: {
        type:String, 
        required:true, 
        unique:true,
        match:/^(\+\d{1,3}[- ]?)?\d{10}$/
    },
    password:{type: String, required:true}
}, {
    timestamps: true
});


module.exports = mongoose.model('User', UserSchema);


