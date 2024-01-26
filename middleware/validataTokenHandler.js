// Import necessary modules
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middleware to validate JWT token
const validateToken = asyncHandler(async (req, res, next) => {
  // Initialize variables
  let token;
  
  // Retrieve token from headers
  let authHeader = req.headers.Authorization || req.headers.authorization;
  
  // Check if Authorization header with Bearer token exists
  if (authHeader && authHeader.startsWith("Bearer")) {
    // Extract token from Authorization header
    token = authHeader.split(" ")[1];

    // Verify the token using the secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      // If there's an error in verification, deny access and send 401 Unauthorized status
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      
      // If token is successfully verified, store user information in the request object
      req.user = decoded.user;
      // Proceed to the next middleware or route handler
      next();
    });

    // If no token is found, deny access and send 401 Unauthorized status
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

// Export the validateToken middleware for use in other parts of the application
module.exports = validateToken;
