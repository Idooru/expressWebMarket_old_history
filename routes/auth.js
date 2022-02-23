const express = require("express");
const controllWorker = require("../controller/authController");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/join", isNotLoggedIn, controllWorker.join);
router.post("/login", isNotLoggedIn, controllWorker.login);
router.post("/logout", isLoggedIn, controllWorker.logout);

module.exports = router;
