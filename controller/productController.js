const dataWorker = require("../data/productData");

async function getProductDetail(req, res, next) {
    const paramsId = req.params.id;

    const productInfo = await dataWorker.productFindOne(paramsId);
    if (productInfo.status === "error") {
        const err = new Error(productInfo.message);
        err.status = 500;
        return next(err);
    }

    res.locals.id = paramsId;
    res.locals.productName = productInfo.name;
    res.locals.productPrice = productInfo.price;
    res.locals.productOrigin = productInfo.origin;
    res.locals.productType = productInfo.type;
    res.render("productInfo");
}

async function getProductMain(req, res, next) {
    const products = await dataWorker.productFindAll();
    const productNames = [];
    for (let i = 1; i < products.length; i++) {
        productNames.push(products[i].name);
        console.log(products[i].dataValues);
    }

    res.locals.productNames = productNames;
    res.render("productMain");
}

async function createProduct(req, res, next) {
    const package = req.body;
    const products = await dataWorker.productCreate(package);
    if (products.status === "error") {
        const err = new Error(products.message);
        err.status = 500;
        return next(err);
    }

    const result = JSON.stringify(products);
    const message = "상품이 생성되었습니다.";
    res.status(201).render("productCreate", { message, result });
}

async function modifyProduct(req, res, next) {
    const paramsId = req.params.id;
    const package = req.body;
    try {
        const getOld = await dataWorker.getBeforeProduct(paramsId);
        await dataWorker.productUpdate(package, paramsId);
        const getNew = await dataWorker.getAfterProduct(paramsId);
        const message = "상품의 정보가 변경되었습니다.";

        res.status(200).render("productUpdateDelete", {
            message,
            getOld,
            getNew,
        });
    } catch (err) {
        if (productInfo.status === "error") {
            const err = new Error(products.message);
            err.status = 500;
            return next(err);
        }
    }
}

async function removeProduct(req, res, next) {
    const paramsId = req.params.id;
    try {
        const getOld = await dataWorker.getBeforeProduct(paramsId);
        await dataWorker.productDestroy(paramsId);
        const getNew = await dataWorker.getAfterProduct(paramsId);
        const message = "상품의 정보가 삭제되었습니다.";

        res.status(203).render("productUpdateDelete", {
            message,
            getOld,
            getNew,
        });
    } catch (err) {
        if (productInfo.status === "error") {
            const err = new Error(products.message);
            err.status = 500;
            return next(err);
        }
    }
}

module.exports = {
    getProductDetail,
    getProductMain,
    createProduct,
    modifyProduct,
    removeProduct,
};
