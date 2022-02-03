import express from "express";
import Product from "../schema/product.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    const { name, price, origin, type } = req.body;
    try {
        const products = await Product.create({
            name,
            price,
            origin,
            type,
        });
        res.send("값을 잘 받았습니다!");
    } catch (err) {
        console.error(err);
        next(err);
        res.send("값을 받지 못하였습니다.");
    }
});

export default router;
