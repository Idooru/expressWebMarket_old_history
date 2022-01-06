const axios = require("axios");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const hostName = "127.0.0.1";
const port = process.env.PORT || 5147;
require("./productServer1");

const getNumWithAxios = async () => {
    try {
        const result = await axios.get("http://127.0.0.1:3257");
        const arrayNum = result.data.length;
        // console.log(arrayNum);
        return arrayNum;
    } catch (err) {
        console.error(err);
    }
};

app.use(morgan("dev"));

const mainRouter = require("./routes/main");
const productRouter = require("./routes/product");
const product1Router = require("./routes/product1");
const product2Router = require("./routes/product2");
const product3Router = require("./routes/product3");

const productPackage = [product1Router, product2Router, product3Router];

for (let i = 0; i < productPackage.length; i++) {
    productPackage[i];
}
app.use("/", mainRouter);
app.use("/product", productRouter);
app.use("/product/:addr", (req, res, next) => {
    console.log(`you connect on /product/${req.params.addr}`);
    next();
});

// (async () => {
//     const arrayNum = await getNumWithAxios();

//     for (let i = 1; i <= arrayNum; i++) {
//         for (let j = 0; j < productPackage.length; j++) {
//             app.use(`/product/product${i}`);
//         }

//     }
// })();

app.use(`/product/product${1}`, product1Router);
app.use("/product/product2", product2Router);
app.use("/product/product3", product3Router);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "/404error.html"));
    throw new Error("404");
});

app.use((err, req, res, next) => {
    console.log(" ### Error Detected! ###");
    if (err.message === "404") {
        setTimeout(() => {
            console.error(err);
        }, 2500);
        return;
    } else {
        res.status(500).send(err.message);
    }
    setTimeout(() => {
        console.error(err);
    }, 2500);
});

app.listen(port, () => {
    console.log(`server is running at http://${hostName}:${port}`);
});
