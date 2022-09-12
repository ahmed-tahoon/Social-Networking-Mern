const User = require("../../Schema/User");
const extend = require('lodash/extend')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../../config/key');

const update = async (req, res) => {
     

	let user = req.profile
	console.log(req.body)

	req.body.updated = Date.now()



	if (req.body.password) {

		if (req.body.password.length < 6) {
			return res.json({
				error: "Password must be at least 6 characters"
			});
		} else {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(req.body.password, salt, (err, hash) => {
					user.password = hash;
					user.save();
					res.json(user)

				});
			});
		}
	} else {
		User.findByIdAndUpdate(user._id, req.body, {new: true, useFindAndModify: false})
        .then((data)=>{res.json(data)})
		
	}


}



module.exports = update