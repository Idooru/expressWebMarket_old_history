const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares.js");
const User = require("../schema/user.js");

const router = express.Router();

router.post("/join", async (req, res, next) => {
    const { id, password, nick } = req.body;
    try {
        const exUser = await User.findOne({ id });
        const exNick = await User.findOne({ nick });

        if (exUser) {
            res.send("이미 가입된 회원입니다.");
        } else if (exNick) {
            res.send("사용중인 닉네임 입니다.");
        }

        const hash = await bcrypt.hash(password, 15);
        await User.create({
            id,
            password: hash,
            nick,
        });
        res.send("회원가입이 완료되었습니다!");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    passport.authenticate("local", async());
});

module.exports = router;
