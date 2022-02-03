import express from "express";
import Product from "../schema/product.js";

const router = express.Router();

router.get("/:id/info", async (req, res, next) => {
    try {
        let productInfo = await Product.find(
            {},
            { _id: 0, name: 1, price: 1, origin: 1, type: 1 }
        );
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
            default:
                res.locals.message = "No more product on that url";
                res.render("noProduct");
                return 0;
        }
        console.log(req.params.id);
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

export default router;
