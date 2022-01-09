// when you get this file, install modules from npm
import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import getNum from "./modules/getNum.js";
import "./productServer1.js";

const app = express();
const hostName = "127.0.0.1";
const port = process.env.PORT || 5147;

app.use(morgan("dev"));
app.use(cors());

import mainRouter from "./routes/main.js";
import productRouter from "./routes/product.js";
import product1Router from "./routes/product1.js";
import product2Router from "./routes/product2.js";
import product3Router from "./routes/product3.js";

app.use("/", mainRouter);
app.use("/product", productRouter);
app.use("/product/:addr", (req, res, next) => {
    console.log(`you connect on /product/${req.params.addr}`);
    next();
});
const data = getNum();
app.use("/product/product1", product1Router);
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
        setTimeout(() => {
            console.error(err);
        }, 2500);
    }
});

app.listen(port, () => {
    console.log(`server is running at http://${hostName}:${port}`);
});
