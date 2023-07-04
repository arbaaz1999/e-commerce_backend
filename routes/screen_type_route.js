const { add_screen_type, get_all_screen_types } = require('../controllers/screen_type_controller');
const { admin_auth } = require('../middlewares/auth_middleware');
const express = require('express');
const router = express.Router();

router.post('/add_screen_type', admin_auth, add_screen_type);
router.get('/', get_all_screen_types);

module.exports = router;