const express = require("express");
const Product = require("../models/products");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll({});
        const productNames = [];
        for (let i = 1; i < products.length; i++) {
            productNames.push(products[i].name);
        }
        console.log(products);
        res.locals.productNames = productNames;
        res.render("productMain");
    } catch (err) {
        next(err);
    }
});

module.exports = router;
