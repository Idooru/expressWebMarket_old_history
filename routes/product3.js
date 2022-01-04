const express = require("express");
const axios = require("axios");
const path = require("path");
const router = express.Router();

const getInfoWithAxios = (key, res) => {
    if (key === "1") {
        res.sendFile(path.join(__dirname, "../productOne.html"));
    } else if (key === "2") {
        res.sendFile(path.join(__dirname, "../productTwo.html"));
    } else if (key === "3") {
        res.sendFile(path.join(__dirname, "../productThree.html"));
    }
};

router.get("/", async (req, res) => {
    try {
        const result = await axios.get("http://127.0.0.1:3257");
        const productID = String(result.data[2].id);

        getInfoWithAxios(productID, res);
        console.log("Request Type:", req.method);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
