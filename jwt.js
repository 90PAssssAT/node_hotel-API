const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // first check request headers has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "Token not found" });
  }
  // extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
  try {
    // verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //attach user informaation to the request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// function to generate a jwt token for a user
const generateToken = (userData) => {
  // const token = jwt.sign({userData}, process.env.JWT_SECRET, { expiresIn: "1h" });
  const token = jwt.sign(userData, process.env.JWT_SECRET);
  return token;
};
module.exports = { jwtAuthMiddleware, generateToken };
