const Product = require("../models/products");

async function FindOne(id, next) {
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

async function FindAll() {
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
            "Cannot read properties of null (reading 'dataValues')"
        ) {
            return new Error("no Product");
        } else {
            return new Error(err.message);
        }
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
            return new Error("same Product");
        } else if (err.message || "notNull Violoation") {
            return new Error("Form Null");
        } else {
            return new Error(err.message);
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
        return 0;
    } catch (err) {
        if (err.message === "Validation error") {
            return new Error("same Product");
        } else if (err.message || "notNull Violoation") {
            return new Error("Form Null");
        } else {
            return new Error(err.message);
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
        return new Error(err.message);
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
