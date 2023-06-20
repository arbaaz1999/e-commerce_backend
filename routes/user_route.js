const express = require('express');
const { create_user } = require('../controllers/user_controller');


const router = express.Router();

router.post('/create', create_user);


module.exports = router;