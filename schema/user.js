import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        requried: true,
        unique: true,
    },
});

export default mongoose.model("User", userSchema);
