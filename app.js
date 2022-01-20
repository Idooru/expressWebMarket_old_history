// when you get this file, install modules from npm
import express from "express";
import morgan from "morgan";
import cors from "cors";
import nunjucks from "nunjucks";
import mongodbConnect from "./schema/index.js";

const app = express();
app.set("port", process.env.PORT || 5147);
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});

app.use(morgan("dev"));
app.use(cors());

mongodbConnect();

import mainRouter from "./routes/main.js";
import productMainRouter from "./routes/productMain.js";
import productDetailRouter from "./routes/productDetail.js";

app.use("/", mainRouter);
app.use("/productMain", productMainRouter);
app.use("/productMain", productDetailRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url}가 존재하지 않습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.log(" ### Error Detected! ###");
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    console.error(err);
    res.render("error");
});

app.listen(app.get("port"), () => {
    console.log(`API server is running at http://localhost:${app.get("port")}`);
});

// test server
