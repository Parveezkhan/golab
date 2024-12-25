const Router = require('express')
const Pool = require('../db/dbConnect')

//import auth controllers
const {
    signupController,
    loginController,
}=require('../Controllers/authController')

const router = Router();

router.post('/signup',signupController);
router.post('/login',loginController);

module.exports = router;