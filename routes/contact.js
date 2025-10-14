const express = require("express");
const router = express.Router();
const { sendContactMessage } = require("../controllers/contactControllers");

router.post("/", sendContactMessage);

module.exports = router;