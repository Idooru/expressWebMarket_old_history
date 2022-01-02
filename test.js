// const axios = require("axios");
// const express = require("express");
// const path = require("path");
// const morgan = require("morgan");
// const app = express();
// const hostName = "127.0.0.1";
// const port = process.env.PORT || 5147;
// require("./productServer1");

// app.use(morgan("dev"));

// const conditionWithKey = (key, res) => {
//     if (key === 1) {
//         res.sendFile(path.join(__dirname, "/productOne.html"));
//     } else if (key === 2) {
//         res.sendFile(path.join(__dirname, "/productTwo.html"));
//     } else if (key === 3) {
//         res.sendFile(path.join(__dirname, "/productThree.html"));
//     } else {
//         res.send("<h1>No data for url</h1>");
//     }
// };

// const getInfoWithAxios = async () => {
//     const result = await axios.get("http://127.0.0.1:3257");
//     const id = String(result.data);
// };

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "./expressAPI.html"));
// });

// app.use("/product/:addr", (req, res, next) => {
//     console.log(`you connect on /product/${req.params.addr}`);
//     next();
// });

// app.get("/product", (req, res) => {
//     res.write("<h1>Here is product information</h1>");
//     getInfoWithAxios();
//     res.send();
// });

// // app.get(`/product/:${addr}`, (req, res) => {});

// app.use((err, req, res, next) => {
//     if (err.message === "No data for url") {
//         res.status(404).send(err.message);
//     }
//     console.error(err);
//     res.status(401).send(err.message);
// });

// app.listen(port, () => {
//     console.log(`server is running at http://${hostName}:${port}`);
// });

const express = require("express");
const app = express();

app.set("port", process.env.PORT || 8080);

const func = (a) => {
    console.log("test");
    return a + 1;
};

app.get("/", (req, res) => {
    console.log(func(1));
});

app.listen(8080);
