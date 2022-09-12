const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../Schema/User");

const protect = async (req, res, next) => {
  let token;
  

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
    const decoded = jwt.verify(token, "123456789");
console.log(decoded)
  try {
    
    const decoded = jwt.verify(token, "123456789");

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
};


module.exports=protect;

