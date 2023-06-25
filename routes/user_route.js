const express = require('express');
const {
    create_user,
    login_auth,
    get_all_users,
    get_user,
    get_user_admin,
    update_profile_by_user,
    update_profile_by_admin } = require('../controllers/user_controller');
const { admin_auth, user_auth } = require('../middlewares/auth_middleware');


const router = express.Router();

router.get('/', admin_auth, get_all_users)
router.get('/get_user', user_auth, get_user)
router.get('/admin/:id', admin_auth, get_user_admin)
router.put('/update_profile', user_auth, update_profile_by_user)
router.put('/admin/:id', admin_auth, update_profile_by_admin)
router.post('/create', create_user);
router.post('/login', login_auth)


module.exports = router;