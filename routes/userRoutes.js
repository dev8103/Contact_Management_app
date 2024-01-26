const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validataTokenHandler');

const {registerUser,loginUser,currentUser} = require('../controllers/userController');

// register 
router.route('/register').post(registerUser);
// login
router.route('/login').post(loginUser);
// current user
router.route('/current').get(validateToken,currentUser);

module.exports = router;