const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../../config/key');
// Load input validation
const validateRegisterInput = require("../../validation/registeration");


// Load User model
const User = require("../../Schema/User");

// @route POST api/users/register
// @desc Register user
// @access Public
const RegisterControllers = ((req,res)=>{

    // Form validation
const { errors, isValid } = validateRegisterInput(req.body);

// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ error : "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

    


module.exports=RegisterControllers