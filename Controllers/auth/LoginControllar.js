const express = require('express')
const User = require('../../Schema/User')
const validateLoginInput = require("../../validation/login");
const keys = require('../../config/key');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
const LoginControllers =  ((req, res)=>{
    console.log(req.user)
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(404).json({errors : "Email invalid"});
  }
  const email = req.body.email;
  const password = req.body.password;
  console.log(password)

// Find user by email
  User.findOne({ email }).then(user => {

    if (!user) {
      return res.status(404).json({ errors : "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        console.log(isMatch)
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          keys.key,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              name:user.name,
            });
          }
        );
      } else {
        return res
          .status(404)
          .json({ errors: "Password incorrect" });
      }
    });
  });
});

module.exports=LoginControllers