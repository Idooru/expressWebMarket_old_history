const express = require("express");
const axios = require("axios");
const showPage = require("../modules/showPage");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await axios.get("http://127.0.0.1:3257");
        const productID = String(result.data[1].id);

        showPage(productID, res);
        console.log("Request Type:", req.method);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
