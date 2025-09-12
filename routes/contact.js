const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contactControllers');
const handlers = require('../controllers/contactControllers');
console.log(handlers); 


router.post('/', sendContactMessage);

module.exports = router;
