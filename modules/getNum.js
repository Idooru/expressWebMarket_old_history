const axios = require("axios");

const getNum = async () => {
    try {
        const result = await axios.get("http://127.0.0.1:3257");
        const data = result.data.length;

        return data;
    } catch (err) {
        console.error(err);
    }
};

module.exports = getNum;
