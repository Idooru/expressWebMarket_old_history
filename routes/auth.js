const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares.js");
const User = require("../models/users.js");

const router = express.Router();

router.post("/join", async (req, res, next) => {
    const { email, password, nickname } = req.body;
    try {
        const exEmail = await User.findOne({ where: { email } });
        const exNick = await User.findOne({ where: { nickname } });

        if (exEmail) {
            return res.send("이미 가입된 회원입니다.");
        } else if (exNick) {
            return res.send("사용중인 닉네임 입니다.");
        }

        const hash = await bcrypt.hash(password, 15);
        await User.create({
            email,
            password: hash,
            nickname,
        });
        res.status(201).send("회원가입이 완료되었습니다!");
    } catch (err) {
        next(err);
    }
});

// router.post("/login", async (req, res, next) => {
//     passport.authenticate("local", async());
// });

module.exports = router;
