// when you get this file, install modules from npm
const axios = require("axios");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
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
app.use(cors());

const mainRouter = require("./routes/main");
const productRouter = require("./routes/product");
const product1Router = require("./routes/product1");
const product2Router = require("./routes/product2");
const product3Router = require("./routes/product3");

app.use("/", mainRouter);
app.use("/product", productRouter);
app.use("/product/:addr", (req, res, next) => {
    console.log(`you connect on /product/${req.params.addr}`);
    next();
});

app.use(`/product/product1`, product1Router);
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
