const path = require("path");

const getInfoWithAxios = (key, res) => {
    if (key === "1") {
        res.sendFile(path.join(__dirname, "../productOne.html"));
    } else if (key === "2") {
        res.sendFile(path.join(__dirname, "../productTwo.html"));
    } else if (key === "3") {
        res.sendFile(path.join(__dirname, "../productThree.html"));
    }
};

module.exports = getInfoWithAxios;
