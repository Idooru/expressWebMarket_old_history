const Product = require("../models/products");

async function productFindOne(id) {
    try {
        const product = await Product.findOne({
            where: { id },
        });

        if (product === null) {
            throw new Error("null");
        }

        return product;
    } catch (err) {
        if (err.message === "null") {
            return new Error("no Product");
        } else {
            return new Error(err.message);
        }
    }
}

async function productFindAll() {
    try {
        const product = await Product.findAll({});

        if (product === null) {
            throw new Error("null");
        }

        return product;
    } catch (err) {
        if (err.message === "null") {
            return new Error("no Product");
        } else {
            return new Error(err.message);
        }
    }
}

async function getBeforeProduct(id) {
    try {
        const BeforeProducts = await Product.findOne({
            where: { id },
        });
        const resultByOldProducts = JSON.stringify(BeforeProducts.dataValues);
        return resultByOldProducts;
    } catch (err) {
        if (
            err.message ===
            "Cannot read properties of null (reading 'dataValues')"
        ) {
            return new Error("no Product");
        } else {
            return new Error(err.message);
        }
    }
}

async function getAfterProduct(id) {
    try {
        const AfterProducts = await Product.findOne({
            where: { id },
        });
        const resultByNewProducts = JSON.stringify(AfterProducts);
        return resultByNewProducts;
    } catch (err) {
        if (
            err.message ===
            "Cannot read properties of null (reading 'dataValues')"
        ) {
            return new Error("no Product");
        } else {
            return new Error(err.message);
        }
    }
}

async function productCreate(package) {
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
            return new Error("same Product");
        } else {
            return new Error(err.message);
        }
    }
}

async function productUpdate(package, paramsId) {
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
        throw new Error(err.message);
    }
}

async function productDestroy(paramsId) {
    try {
        await Product.destroy({
            where: { id: paramsId },
        });
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    productFindOne,
    productFindAll,
    getBeforeProduct,
    getAfterProduct,
    productCreate,
    productUpdate,
    productDestroy,
};
