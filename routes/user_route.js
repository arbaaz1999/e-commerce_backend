const express = require('express');
const { create_user, login_auth } = require('../controllers/user_controller');


const router = express.Router();

router.post('/create', create_user);
router.post('/login', login_auth)


module.exports = router;