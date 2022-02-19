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

const productRouter = require("./routes/products.js");
const authRouter = require("./routes/auth");

app.use("/favicon.ico", (req, res) => {
    res.send();
});

app.get("/", (req, res) => {
    res.status(200).render("expressAPI.html");
});

app.use("/products", productRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} does not exist`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.log(" ### Error Detected! ###");
    if (err.message === "no Product") {
        res.locals.warning = "No applicable products found";
        res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
        res.locals.error.status = 404;
        res.locals.message =
            "The requested product could not be found, please go back.";
        console.error(err);
        return res.render("occasionalError");
    }
    if (err.message === "same Product") {
        res.locals.warning = "A product with the same name exists";
        res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
        res.locals.error.status = 400;
        res.locals.message =
            "The name of the product cannot be the same, so please reset the name";
        console.error(err);
        return res.render("occasionalError");
    }
    if (err.message === "Form Null") {
        res.locals.warning = "One of the forms is not filled in";
        res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
        res.locals.error.status = 400;
        res.locals.message =
            "You forgot to fill out the form. Please check your input";
        return res.render("occasionalError");
    }
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.locals.error.status = 500;
    console.error(err);
    res.render("error");
});

app.listen(app.get("port"), () => {
    console.log(`API server is running at http://localhost:${app.get("port")}`);
});

// test server
