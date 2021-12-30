const express = require("express");
const app = express();

app.set("port", process.env.PORT || 8080);

function func(a) {
    console.log(a);
    return a + 1;
}

app.set("func2", func());

app.get("/", (req, res) => {
    res.send("test");
    console.log(app.get("port"));
    console.log(app.get("func2"));
});

app.listen(8080);
// const axios = require("axios");
// const express = require("express");
// const path = require("path");
// const morgan = require("morgan");
// const app = express();
// const hostName = "127.0.0.1";
// const port = process.env.PORT || 5147;
// require("./productServer1");

// app.use(morgan("dev"));

// function getInfoWithAxios(key) {
//     if (key === "1") {
//         res.sendFile(path.join(__dirname, "./productOne.html"));
//     } else if (key === "2") {
//         res.sendFile(path.join(__dirname, "./productTwo.html"));
//     } else {
//         res.sendFile(path.join(__dirname, "./productThree.html"));
//     }
// }

// app.set("func", getInfoWithAxios());

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "./expressAPI.html"));
// });

// app.use("/product/:addr", (req, res, next) => {
//     console.log(`you connect on ${req.params.addr}}`);
//     next();
// });

// app.get("/product", (req, res) => {
//     res.write("<h1>Here is product information</h1>");
//     res.send();
// });

// app.get("/product/product1", async (req, res) => {
//     try {
//         const result = await axios.get("http://127.0.0.1:3257");
//         const productID = String(result.data[0].id);
//         req.app.get("func");
//         console.log("Request Type:", req.method);
//     } catch (err) {
//         console.error(err);
//     }
// });

// app.get("/product/product2", async (req, res) => {
//     try {
//         const result = await axios.get("http://127.0.0.1:3257");
//         const productID = String(result.data[1].id);

//         (function getInfoWithAxios(key) {
//             if (key === "1") {
//                 res.sendFile(path.join(__dirname, "./productOne.html"));
//             } else if (key === "2") {
//                 res.sendFile(path.join(__dirname, "./productTwo.html"));
//             } else {
//                 res.sendFile(path.join(__dirname, "./productThree.html"));
//             }
//         })(productID);
//         console.log("Request Type:", req.method);
//     } catch (err) {
//         console.error(err);
//     }
// });

// app.get("/product/product3", async (req, res) => {
//     try {
//         const result = await axios.get("http://127.0.0.1:3257");
//         const productID = String(result.data[2].id);

//         (function getInfoWithAxios(key) {
//             if (key === "1") {
//                 res.sendFile(path.join(__dirname, "./productOne.html"));
//             } else if (key === "2") {
//                 res.sendFile(path.join(__dirname, "./productTwo.html"));
//             } else {
//                 res.sendFile(path.join(__dirname, "./productThree.html"));
//             }
//         })(productID);
//         console.log("Request Type:", req.method);
//     } catch (err) {
//         console.error(err);
//     }
// });

// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(401).send(err.message);
// });

// app.listen(port, () => {
//     console.log(`server is running at http://${hostName}:${port}`);
// });
