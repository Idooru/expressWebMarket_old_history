import express from "express";
import axios from "axios";
import showPage from "../modules/showPage.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await axios.get("http://127.0.0.1:3257");
        const productID = String(result.data[0].id);

        showPage(productID, res);
        console.log("Request Type:", req.method);
    } catch (err) {
        console.error(err);
    }
});

export default router;
