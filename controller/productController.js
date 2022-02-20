const dataWorker = require("../data/productData");

async function getProductDetail(req, res, next) {
    const paramsId = req.params.id;
    let product;

    try {
        product = await dataWorker.FindOne(paramsId);
    } catch (err) {
        return next(err);
    }

    res.locals.id = paramsId;
    res.locals.productName = product.name;
    res.locals.productPrice = product.price;
    res.locals.productOrigin = product.origin;
    res.locals.productType = product.type;
    res.render("productInfo");
}

async function getProductMain(req, res, next) {
    let products;

    try {
        products = await dataWorker.FindAll();
    } catch (err) {
        return next(err);
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
    let product;

    try {
        product = await dataWorker.Create(package);
    } catch (err) {
        return next(err);
    }

    const result = JSON.stringify(product);
    const message = "The product has been created";
    res.status(201).render("productCreate", { message, result });
}

async function modifyProduct(req, res, next) {
    const paramsId = req.params.id;
    const package = req.body;
    let getOld;
    let getNew;

    try {
        getOld = await dataWorker.getBefore(paramsId);
        await dataWorker.Update(package, paramsId);
        getNew = await dataWorker.getAfter(paramsId);
    } catch (err) {
        return next(err);
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
    let getOld;
    let getNew;

    try {
        getOld = await dataWorker.getBefore(paramsId);
        await dataWorker.Destroy(paramsId);
        getNew = await dataWorker.getAfter(paramsId);
    } catch (err) {
        return next(err);
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
