import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
