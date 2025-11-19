const {Router}= require('express');

const { signupUser,loginUser} = require('../../controller/auth/auth.js');

const router = Router();

// Public route to create a booking
router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);


module.exports=router;