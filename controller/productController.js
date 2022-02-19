const dataWorker = require("../data/productData");

async function getProductDetail(req, res, next) {
    const paramsId = req.params.id;

    const product = await dataWorker.FindOne(paramsId);

    if (product.message) {
        return next(product);
    }

    res.locals.id = paramsId;
    res.locals.productName = product.name;
    res.locals.productPrice = product.price;
    res.locals.productOrigin = product.origin;
    res.locals.productType = product.type;
    res.render("productInfo");
}

async function getProductMain(req, res, next) {
    const products = await dataWorker.FindAll();

    if (products.message) {
        return next(products);
    }

    const result = products.map((value, index) => {
        const productNames = [];
        productNames.push(products[index].name);
        console.log(products[index].dataValues);
        return productNames;
    });

    result.shift();

    res.locals.productNames = result;
    res.render("productMain");
}

async function createProduct(req, res, next) {
    const package = req.body;
    const products = await dataWorker.Create(package);

    if (products.message) {
        return next(products);
    }

    const result = JSON.stringify(products);
    const message = "The product has been created";
    res.status(201).render("productCreate", { message, result });
}

async function modifyProduct(req, res, next) {
    const paramsId = req.params.id;
    const package = req.body;

    const getOld = await dataWorker.getBefore(paramsId);

    if (getOld.message) {
        return next(getOld);
    }

    const updater = await dataWorker.Update(package, paramsId);

    if (updater.message) {
        return next(updater);
    }

    const getNew = await dataWorker.getAfter(paramsId);

    if (getNew.message) {
        return next(getNew);
    }

    const message = "The product's info has been modified";

    res.status(200).render("productUpdateDelete", {
        message,
        getOld,
        getNew,
    });
}

async function removeProduct(req, res, next) {
    const paramsId = req.params.id;

    const getOld = await dataWorker.getBefore(paramsId);

    if (getOld.message) {
        return next(getOld);
    }

    const destroyer = await dataWorker.Destroy(paramsId);

    if (destroyer.message) {
        return next(destroyer);
    }

    const getNew = await dataWorker.getAfter(paramsId);

    if (getNew.message) {
        return next(getNew);
    }

    const message = "The product's info has been removed ";

    res.status(203).render("productUpdateDelete", {
        message,
        getOld,
        getNew,
    });
}

module.exports = {
    getProductDetail,
    getProductMain,
    createProduct,
    modifyProduct,
    removeProduct,
};
