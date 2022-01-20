import express from "express";

const app = express();
app.set("port", process.env.PORT || 3002);
app.listen(app.get("port"), () => {
    console.log(
        `Product server is running at http://localhost:${app.get("port")}`
    );
});

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
    res.json(products);
});
