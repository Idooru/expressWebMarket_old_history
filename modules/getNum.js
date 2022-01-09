import axios from "axios";

async function getNumWithAxios() {
    try {
        const result = await axios.get("http://127.0.0.1:3257");
        const arrayNum = result.data.length;

        return arrayNum;
    } catch (err) {
        console.error(err);
    }
}

export default getNumWithAxios;
