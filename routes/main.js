const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("expressAPI.html");
});

module.exports = router;
