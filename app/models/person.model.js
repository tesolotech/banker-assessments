
const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type:String, 
        required:true
    },
    age:{type: Number, required:true},
    salary:{type: Number, required:true}
}, {
    timestamps: true
});


module.exports = mongoose.model('Person', PersonSchema);
