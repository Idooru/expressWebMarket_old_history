const express = require("express");
const Product = require("../models/products");

const router = express.Router();

router.post("/createProduct", async (req, res) => {
    const { name, price, origin, type } = req.body;
    try {
        const products = await Product.create({
            name,
            price,
            origin,
            type,
        });
        res.status(201).json(products);
    } catch (err) {
        if (err.message === "Validation error") {
            return res.status(400).send("같은 이름의 상품이 존재합니다.");
        }
        res.status(400).send("값을 받지 못하였습니다.");
    }
});

router.patch("/modifyProduct/", async (req, res, next) => {
    const { id, name, price, origin, type } = req.body;
    const query = req.query.ID;

    try {
        const getOld = async () => {
            const BeforeProducts = await Product.findOne({
                where: { id: query },
            });
            const resultByOldProducts = JSON.stringify(
                BeforeProducts.dataValues
            );
            return resultByOldProducts;
        };
        const resultByGetOld = await getOld();

        await Product.update(
            {
                id,
                name,
                price,
                origin,
                type,
            },
            {
                where: { id: query },
            }
        );
        const getNew = async () => {
            const AfterProducts = await Product.findAll({
                where: { id },
            });
            const resultByNewProducts = JSON.stringify(AfterProducts);
            return resultByNewProducts;
        };

        const resultByGetNew = await getNew();
        const message = "상품의 정보가 변경되었습니다.";

        res.status(201).render("productUD", {
            message,
            resultByGetOld,
            resultByGetNew,
        });
    } catch (err) {
        next(err);
    }
});

router.delete("/removeProduct/", async (req, res, next) => {
    const { id } = req.body;
    const query = req.query.ID;
    try {
        const getOld = async () => {
            const BeforeProducts = await Product.findOne({
                where: { id: query },
            });
            const resultByOldProducts = JSON.stringify(
                BeforeProducts.dataValues
            );
            return resultByOldProducts;
        };
        const resultByGetOld = await getOld();

        await Product.destroy({
            where: { id: query },
        });
        const getNew = async () => {
            const AfterProducts = await Product.findOne({
                where: { id },
            });
            const resultByNewProducts = JSON.stringify(AfterProducts);
            return resultByNewProducts;
        };

        const resultByGetNew = await getNew();
        const message = "상품의 정보가 변경되었습니다.";

        res.status(201).render("productUD", {
            message,
            resultByGetOld,
            resultByGetNew,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
