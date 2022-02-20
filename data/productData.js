const Product = require("../models/products");

async function FindOne(id) {
    try {
        const product = await Product.findOne({
            where: { id },
        });

        if (product === null) {
            throw new Error("no Product");
        }

        return product;
    } catch (err) {
        throw err;
    }
}

async function FindAll() {
    try {
        const products = await Product.findAll({});

        if (products === null) {
            throw new Error("null");
        }

        return products;
    } catch (err) {
        throw err;
    }
}

async function getBefore(id) {
    try {
        const BeforeProducts = await Product.findOne({
            where: { id },
        });
        const resultByOldProducts = JSON.stringify(BeforeProducts.dataValues);
        return resultByOldProducts;
    } catch (err) {
        if (
            err.message ===
            "'Cannot read properties of null (reading 'dataValues')'"
        ) {
            throw new Error("no Product");
        }
        throw err;
    }
}

async function getAfter(id) {
    try {
        const AfterProducts = await Product.findOne({
            where: { id },
        });
        const resultByNewProducts = JSON.stringify(AfterProducts);
        return resultByNewProducts;
    } catch (err) {
        throw err;
    }
}

async function Create(package) {
    try {
        const { id, name, price, origin, type } = package;
        const createdProduct = await Product.create({
            id,
            name,
            price,
            origin,
            type,
        });
        return createdProduct;
    } catch (err) {
        if (err.message === "Validation error") {
            throw new Error("same Product");
        } else if (err.message || "notNull Violoation") {
            throw new Error("Form Null");
        } else {
            throw err;
        }
    }
}

async function Update(package, paramsId) {
    try {
        const { id, name, price, origin, type } = package;
        await Product.update(
            {
                id,
                name,
                price,
                origin,
                type,
            },
            {
                where: { id: paramsId },
            }
        );
    } catch (err) {
        if (err.message === "Validation error") {
            throw new Error("same Product");
        } else if (err.message || "notNull Violoation") {
            throw new Error("Form Null");
        } else {
            throw err;
        }
    }
}

async function Destroy(paramsId) {
    try {
        await Product.destroy({
            where: { id: paramsId },
        });
        return 0;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    FindOne,
    FindAll,
    getBefore,
    getAfter,
    Create,
    Update,
    Destroy,
};
