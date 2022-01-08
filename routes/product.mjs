import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>Here is product information</h1>");
});

export default router;
