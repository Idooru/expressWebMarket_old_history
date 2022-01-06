const express = require("express");
const app = express();
const Port = process.env.PORT || 3257;
const hostName = "127.0.0.1";
const axios = require("axios");
const cors = require("cors");

app.set("port", Port);

app.use(cors());

app.get("/", (req, res) => {
    const products = [
        {
            id: 1,
            name: "농구공",
            price: 100000,
            seller: "조던",
            imageUrl: "images/products/basketball1.jpeg",
        },
        {
            id: 2,
            name: "축구공",
            price: 50000,
            seller: "메시",
            imageUrl: "images/products/soccerball1.jpg",
        },
        {
            id: 3,
            name: "키보드",
            price: 10000,
            seller: "그랩",
            imageUrl: "images/products/keyboard1.jpg",
        },
    ];
    res.send(products);
});

app.listen(app.get("port"), () => {
    console.log("상품 정보 서버가 실행중입니다.");
    console.log(`Product Server (http://${hostName}:${Port})`);
});

module.exports = { hostName, Port };
