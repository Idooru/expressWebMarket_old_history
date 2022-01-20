import express from "express";
import Product from "../schema/product.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find({});
        const productNames = [];
        for (let i = 0; i < products.length; i++) {
            productNames.push(products[i].name);
        }
        console.log(products);
        res.render("productMain", { productNames });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default router;
