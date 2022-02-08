const express = require("express");
const Product = require("../models/products");

const router = express.Router();

router.get("/:id/info", async (req, res, next) => {
    try {
        let productInfo = await Product.findAll({});
        // let dataBox = [];

        // for (let key in productInfo) {
        //     if (key === "0") continue;
        //     dataBox.push(productInfo[key].dataValues);
        // }

        switch (req.params.id) {
            case "1":
                productInfo = productInfo[1];
                break;
            case "2":
                productInfo = productInfo[2];
                break;
            case "3":
                productInfo = productInfo[3];
                break;
            case "4":
                productInfo = productInfo[4];
                break;
            case "5":
                productInfo = productInfo[5];
                break;
            case "6":
                productInfo = productInfo[6];
                break;
            case "7":
                productInfo = productInfo[7];
                break;
            case "8":
                productInfo = productInfo[8];
                break;
            case "9":
                productInfo = productInfo[9];
                break;
            case "10":
                productInfo = productInfo[10];
                break;
            case "11":
                productInfo = productInfo[11];
                break;

            default:
                res.locals.message = "No more product on that url";
                res.render("noProduct");
                return 0;
        }

        res.locals.id = req.params.id;
        res.locals.productName = productInfo.name;
        res.locals.productPrice = productInfo.price;
        res.locals.productOrigin = productInfo.origin;
        res.locals.productType = productInfo.type;
        res.render("productInfo");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
