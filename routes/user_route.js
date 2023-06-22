const express = require('express');
const { create_user, login_auth, get_all_users } = require('../controllers/user_controller');
const { admin_auth, user_auth } = require('../middlewares/auth_middleware');


const router = express.Router();

router.get('/', user_auth, admin_auth, get_all_users)
router.post('/create', create_user);
router.post('/login', login_auth)


module.exports = router;