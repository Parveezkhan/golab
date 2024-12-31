const Router = require('express')
const Pool = require('../db/dbConnect')

//import auth controllers
const {
    signupController,
    loginController,
    getAllUsers,
    addUser,
}=require('../Controllers/authController')

const router = Router();

router.post('/signup',signupController);
router.post('/login',loginController);
router.get("/allUsers",getAllUsers);
router.post('/addUser',addUser)

module.exports = router;