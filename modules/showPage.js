import path from "path";

const __dirname = path.resolve();

const getInfoWithAxios = (key, res) => {
    if (key === "1") {
        res.sendFile(path.join(__dirname, "/productOne.html"));
    } else if (key === "2") {
        res.sendFile(path.join(__dirname, "/productTwo.html"));
    } else if (key === "3") {
        res.sendFile(path.join(__dirname, "/productThree.html"));
    }
};

export default getInfoWithAxios;
