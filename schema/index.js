import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connect = async () => {
    try {
        if (process.env.NODE_ENV !== "production") {
            mongoose.set("debug", true);
        }
        const result = await mongoose.connect(
            `mongodb://${process.env.NAME}:${process.env.PASSWORD}@localhost:27017/admin`,
            { dbName: "nodejs" }
        );
    } catch (err) {
        setTimeout(() => {
            console.error(err);
            console.log("몽고 디비 연결 실패, 재연결을 시도합니다.");
            connect();
        }, 1500);
    }
};

export default connect;
