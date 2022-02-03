import mongoose from "mongoose";

const { Schema } = mongoose;
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    { versionKey: "_somethingElse" }
);

export default mongoose.model("Product", productSchema);
