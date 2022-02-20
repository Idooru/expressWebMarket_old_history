const dataWorker = require("../data/productData");

async function getProductDetail(req, res, next) {
    try {
        const paramsId = req.params.id;
        const product = await dataWorker.FindOne(paramsId);

        res.locals.id = paramsId;
        res.locals.productName = product.name;
        res.locals.productPrice = product.price;
        res.locals.productOrigin = product.origin;
        res.locals.productType = product.type;
        res.render("productInfo");
    } catch (err) {
        next(err);
    }
}

async function getProductMain(req, res, next) {
    try {
        const products = await dataWorker.FindAll();

        const result = products.map((value, index) => {
            const productNames = [];
            productNames.push(products[index].name);
            console.log(products[index].dataValues);
            return productNames;
        });

        result.shift();

        res.locals.productNames = result;
        res.render("productMain");
    } catch (err) {
        next(err);
    }
}

async function createProduct(req, res, next) {
    try {
        const package = req.body;
        const products = await dataWorker.Create(package);

        const result = JSON.stringify(products);
        const message = "The product has been created";
        res.status(201).render("productCreate", { message, result });
    } catch (err) {
        next(err);
    }
}

async function modifyProduct(req, res, next) {
    try {
        const paramsId = req.params.id;
        const package = req.body;

        const getOld = await dataWorker.getBefore(paramsId);
        await dataWorker.Update(package, paramsId);
        const getNew = await dataWorker.getAfter(paramsId);

        const message = "The product's info has been modified";

        res.status(200).render("productUpdateDelete", {
            message,
            getOld,
            getNew,
        });
    } catch (err) {
        next(err);
    }
}

async function removeProduct(req, res, next) {
    try {
        const paramsId = req.params.id;

        const getOld = await dataWorker.getBefore(paramsId);
        await dataWorker.Destroy(paramsId);
        const getNew = await dataWorker.getAfter(paramsId);

        const message = "The product's info has been removed ";

        res.status(203).render("productUpdateDelete", {
            message,
            getOld,
            getNew,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProductDetail,
    getProductMain,
    createProduct,
    modifyProduct,
    removeProduct,
};
