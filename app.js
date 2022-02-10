const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const nunjucks = require("nunjucks");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");

const { sequelize } = require("./models");

dotenv.config();

const app = express();
// passportConfig();
app.set("port", process.env.PORT || 5147);
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("SQL 연결 성공!");
    })
    .catch(console.error);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },

        name: "session-cookie",
    })
);

const mainRouter = require("./routes/main.js");
const productMainRouter = require("./routes/productMain");
const productDetailRouter = require("./routes/productDetail");
const productSettingRouter = require("./routes/productSetting");
const authRouter = require("./routes/auth");

app.use("/favicon.ico", (req, res) => {
    res.send();
});

app.use("/", mainRouter);
app.use("/productMain", productMainRouter);
app.use("/products", productDetailRouter);
app.use("/products", productSettingRouter);
app.use("/auth", authRouter);

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
