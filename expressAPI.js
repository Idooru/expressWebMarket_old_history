const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();
const hostName = "127.0.0.1";
const port = process.env.PORT || 5147;

require("./productServer1");

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "./expressAPI.html"));
});

app.get("/product1", async (req, res) => {
    try {
        const result = await axios.get("http://127.0.0.1:3257");
        const productID = String(result.data[0].id);
        console.log(`ID : (${productID})`);
        (function getInfoWithAxios(key) {
            if (key === "1") {
                res.sendFile(path.join(__dirname, "./productOne.html"));
            } else if (key === "2") {
                res.sendFile(path.join(__dirname, "./productTwo.html"));
            } else {
                res.sendFile(path.join(__dirname, "./productThree.html"));
            }
        })(productID);
    } catch (err) {
        console.error(err);
    }
});

app.get("/product2", async (req, res) => {
    try {
        const result = await axios.get("http://127.0.0.1:3257");
        const productID = String(result.data[1].id);
        console.log(`ID : (${productID})`);
        (function getInfoWithAxios(key) {
            if (key === "1") {
                res.sendFile(path.join(__dirname, "./productOne.html"));
            } else if (key === "2") {
                res.sendFile(path.join(__dirname, "./productTwo.html"));
            } else {
                res.sendFile(path.join(__dirname, "./productThree.html"));
            }
        })(productID);
    } catch (err) {
        console.error(err);
    }
});

app.get("/product3", async (req, res) => {
    try {
        const result = await axios.get("http://127.0.0.1:3257");
        const productID = String(result.data[2].id);
        console.log(`ID : (${productID})`);
        (function getInfoWithAxios(key) {
            if (key === "1") {
                res.sendFile(path.join(__dirname, "./productOne.html"));
            } else if (key === "2") {
                res.sendFile(path.join(__dirname, "./productTwo.html"));
            } else {
                res.sendFile(path.join(__dirname, "./productThree.html"));
            }
        })();
    } catch (err) {
        console.error(err);
    }
});

app.listen(port, () => {
    console.log(`server is running at http://${hostName}:${port}`);
});
