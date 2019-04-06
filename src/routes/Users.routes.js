const express = require('express');
const router = express.Router();

const User_Controller = require('../controllers/User.controller');

router.post('/register/', User_Controller.register);
router.post('/login', User_Controller.authenticate);

router.get('/test', (req, res) => {
    res.status(200).send("Successfull test");
});

module.exports = router;