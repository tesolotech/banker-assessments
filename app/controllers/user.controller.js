
const mongoose = require('mongoose');
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check_auth');
const messagebird = require('messagebird')('hWkhOCG62llUZdGZMbjqQFADy');
const Contact = require('../models/contact.model.js');


// Create and save user
exports.signupUser = (req, res, next) => {

    User.find({mobile:req.body.mobile})
    .exec()
    .then(user => {
        if(user.length >=1){
            return res.status(409).json({
                message:"User Exists"
            })
        }else{
            bcrypt.hash(req.body.password,10, (err,hash)=>{
                if(err){
                   return res.status(500).json({
                        error:err
                    });
                }else{
                    const user = new User({
                        _id:new mongoose.Types.ObjectId(),
                        mobile:req.body.mobile,
                        password:hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created successfull'
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }
            })
        }
    })
    .catch()

};

// Login user
exports.loginUser= (req,res,next) =>{
    User.find({mobile:req.body.mobile})
    .exec()
    .then(user => {
        if(user.length < 1){
            res.status(401).json({
                message : 'Auth Failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                res.status(401).json({
                    message : 'Auth Failed'
                }); 
            }
            if(result){
                const token = jwt.sign({
                    mobile:user[0].mobile,
                    userId:user[0]._id
                },
                'RADHASWAMI',
                {
                    expiresIn: '1h',

                });

                res.status(200).json({
                    message : 'Auth Successful',
                    token: token
                }); 
            }
            if(err){
                res.status(401).json({
                    message : 'Auth Failed'
                });
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
};


// Delete User
exports.userDelete = (req,res,next) =>{
    console.log(req.params)
    User.remove({ _id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:'User deleted',
            result : result
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

//Get all Users
exports.GetAllUser = (req,res) =>{
    User.find()
    .then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

//Get Single Users by id
exports.GetUserById = (req,res) =>{
    
    User.findById({ _id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            data:result
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

//Update Single Users by id
exports.UpdateUserById = (req,res) =>{

    bcrypt.hash(req.body.password,10, (err,hash)=>{
        if(err){
           return res.status(500).json({
                error:err
            });
        }else{
            const dataModel = {
                mobile : req.body.mobile,
                password : hash
            }
            User.findByIdAndUpdate(req.params.userId,{$set:dataModel},{new: true} )
            .exec()
            .then(result => {
                res.status(200).json({
                    message:'User Successfully Updated',
                    data:result
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while Updating users."
                });
            });

        }
    })
    // User.findByIdAndUpdate({ _id: req.params.userId, mobile:req.body.mobile, new: true})
    // .exec()
    // .then(result => {
    //     res.status(200).json({
    //         message:'User Successfully Updated',
    //         data:result
    //     });
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while Updating users."
    //     });
    // });
};


// Add contact number with name
exports.AddContacts = (req, res, next) => {

    Contact.find({mobile:req.body.mobile})
    .exec()
    .then(contact => {
        if(contact.length >=1){
            return res.status(409).json({
                message:"Contact Exists"
            })
        }else{
           
            messagebird.lookup.read(req.body.mobile, (err, response)=>{
                if(err){
                   return res.status(500).json({
                        error:err
                    });
                }else{
                    console.log(response)
                    const contact = new Contact({
                        _id:new mongoose.Types.ObjectId(),
                        mobile:req.body.mobile,
                        name:req.body.name
                    });
                    contact.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Contact created successfull'
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }
            })
        }
    })
    .catch()

};


//Get all Users
exports.GetMessage = (req,res) =>{
    res.status(200).json({
        message:'Welcome great user',
        EntraData:'I love to coding'
    })
    
};