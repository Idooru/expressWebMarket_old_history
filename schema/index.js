import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connect = async () => {
    try {
        if (process.env.NODE_ENV !== "production") {
            mongoose.set("debug", true);
        }
        await mongoose.connect(
            `mongodb://${process.env.NAME}:${process.env.PASSWORD}@localhost:27017/admin`,
            { dbName: "nodejs" }
        );
        console.log("몽고 디비 연결 성공");
    } catch (err) {
        console.error("몽고 디비 연결 에러", err);
    }
};

mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊켰습니다. 연결을 재시도합니다.");
    connect();
});

export default connect;
