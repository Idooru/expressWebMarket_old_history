const express = require("express");
const Product = require("../models/products");

const router = express.Router();
router.get("/:id/info", async (req, res, next) => {
    try {
        let productInfo = await Product.findAll({});
        const params = req.params.id;

        if (productInfo[params] === undefined) {
            res.render("noProduct");
            return;
        }

        productInfo = productInfo[params];

        res.locals.id = req.params.id;
        res.locals.productName = productInfo.name;
        res.locals.productPrice = productInfo.price;
        res.locals.productOrigin = productInfo.origin;
        res.locals.productType = productInfo.type;
        res.render("productInfo");
    } catch (err) {
        next(err);
    }
});

module.exports = router;
