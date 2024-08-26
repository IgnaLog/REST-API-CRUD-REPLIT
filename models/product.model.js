import mongoose from "mongoose";
import { type } from "os";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      deafult: 0,
    },
    image: {
      public_id: String,
      secure_url: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
