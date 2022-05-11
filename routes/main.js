const express = require('express');
const router = express.Router();
const { validateUserRegister, validateUserImage, validateIfUserLoggedIn, validateText } = require("../middleware/main");
const { userRegister, userLogin, enterText } = require("../controllers/main");

router.post("/register", validateUserRegister, validateUserImage, userRegister);
router.post("/login", userLogin);
router.post("/enter-text", validateIfUserLoggedIn, validateText, enterText);

module.exports = router;