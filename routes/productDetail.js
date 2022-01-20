import express from "express";
import Product from "../schema/product.js";

const router = express.Router();

router.get("/:id/info", async (req, res, next) => {
    try {
        console.log(typeof req.params.id, req.params.id);
        let productInfo = await Product.find(
            {},
            { _id: 0, name: 1, price: 1, origin: 1, type: 1 }
        );
        switch (req.params.id) {
            case "1":
                productInfo = productInfo[0];
                break;
            case "2":
                productInfo = productInfo[1];
                break;
            case "3":
                productInfo = productInfo[2];
                break;
            case "4":
                productInfo = productInfo[3];
                break;
            case "5":
                productInfo = productInfo[4];
                break;
            default:
                productInfo = "no more product";
                throw new Error(data);
        }
        res.send(
            `<p>상품번호 : ${req.params.id}</p>  <p>상품정보 : ${productInfo}</p>`
        );
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default router;
