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
            return {
                status: "error",
                message: "상품을 찾을 수 없습니다.",
            };
        } else {
            return {
                status: "error",
                message: err.message,
            };
        }
    }
}

async function productFindAll() {
    try {
        const result = await Product.findAll({});
        return result;
    } catch (err) {
        return {
            status: "error",
            message: err.message,
        };
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
            return {
                status: "error",
                message: "상품을 찾을 수 없습니다.",
            };
        } else {
            return {
                status: "error",
                message: err.message,
            };
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
            return {
                status: "error",
                message: "상품을 찾을 수 없습니다.",
            };
        } else {
            return {
                status: "error",
                message: err.message,
            };
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
            return {
                status: "error",
                message: "같은 이름의 상품이 존재합니다.",
            };
        } else {
            return {
                status: "error",
                message: err.message,
            };
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
        return {
            status: "error",
            message: err.message,
        };
    }
}

async function productDestroy(paramsId) {
    try {
        await Product.destroy({
            where: { id: paramsId },
        });
    } catch (err) {
        return {
            status: "error",
            message: err.message,
        };
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
