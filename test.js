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

// const express = require("express");
// const app = express();

// app.set("port", process.env.PORT || 8080);

// const func = (a) => {
//     console.log("test");
//     return a + 1;
// };

// app.get("/", (req, res) => {
//     console.log(func(1));
// });

// app.listen(8080);

// 2022-01-04 epxressAPI Backup
// const axios = require("axios");
// const express = require("express");
// const path = require("path");
// const morgan = require("morgan");
// const app = express();
// const hostName = "127.0.0.1";
// const port = process.env.PORT || 5147;
// require("./productServer1");

// app.use(morgan("dev"));

// const getInfoWithAxios = (key, res) => {
//     if (key === "1") {
//         res.sendFile(path.join(__dirname, "./productOne.html"));
//     } else if (key === "2") {
//         res.sendFile(path.join(__dirname, "./productTwo.html"));
//     } else if (key === "3") {
//         res.sendFile(path.join(__dirname, "./productThree.html"));
//     }
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
//     res.send();
// });

// app.get("/product/product1", async (req, res) => {
//     try {
//         const result = await axios.get("http://127.0.0.1:3257");
//         const productID = String(result.data[0].id);

//         getInfoWithAxios(productID, res);
//         console.log("Request Type:", req.method);
//     } catch (err) {
//         console.error(err);
//     }
// });

// app.get("/product/product2", async (req, res) => {
//     try {
//         const result = await axios.get("http://127.0.0.1:3257");
//         const productID = String(result.data[1].id);

//         getInfoWithAxios(productID, res);
//         console.log("Request Type:", req.method);
//     } catch (err) {
//         console.error(err);
//     }
// });

// app.get("/product/product3", async (req, res) => {
//     try {
//         const result = await axios.get("http://127.0.0.1:3257");
//         const productID = String(result.data[2].id);

//         getInfoWithAxios(productID, res);
//         console.log("Request Type:", req.method);
//     } catch (err) {
//         console.error(err);
//     }
// });

// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, "/404error.html"));
//     throw new Error("404");
// });

// app.use((err, req, res, next) => {
//     console.log(" ### Error Detected! ###");
//     if (err.message === "404") {
//         setTimeout(() => {
//             console.error(err);
//         }, 2500);
//         return;
//     } else {
//         res.status(500).send(err.message);
//     }
//     setTimeout(() => {
//         console.error(err);
//     }, 2500);
// });

// app.listen(port, () => {
//     console.log(`server is running at http://${hostName}:${port}`);
// });

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
// for (j = 1; j <= 3; j++) {
//     for (i = 0; i < productPackage.length; i++) {
//         app.use(`/product/product${j}`, productPackage[i]);
//     }
// }
app.use("/", mainRouter);
app.use("/product", productRouter);
app.use("/product/:addr", (req, res, next) => {
    console.log(`you connect on /product/${req.params.addr}`);
    next();
});

(async () => {
    const arrayNum = await getNumWithAxios();
    const productPackage = [product1Router, product2Router, product3Router];

    for (let i = 1; i <= arrayNum; i++) {
        for (let j in productPackage) {
            app.use(`/product/product${i}`, productPackage[j]);
        }
        // for (let j = 1; j <= )
        // app.use("/product/product1", product1Router);
        // app.use("/product/product2", product2Router);
        // app.use("/product/product3", product3Router);
    }
})();

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
